import {
    decryptMessage,
    getMessage,
    encryptMessage,
    generateKey,
    binaryStringToArray,
    signMessage,
    arrayToHexString,
    OpenPGPKey,
    SHA256
} from 'pmcrypto';
import { openpgp } from 'pmcrypto/lib/openpgp';
import { ReadableStream as PolyfillReadableStream } from 'web-streams-polyfill';
import { createReadableStreamWrapper } from '@mattiasbuelens/web-streams-adapter';
import { ENCRYPTION_CONFIGS, ENCRYPTION_TYPES } from '../constants';
import { generatePassphrase } from './calendarKeys';
import { createSessionKey, getEncryptedSessionKey } from '../calendar/encrypt';
import { serializeUint8Array } from '../helpers/serialization';

const toPolyfillReadable = createReadableStreamWrapper(PolyfillReadableStream);

interface UnsignedEncryptionPayload {
    message: string;
    privateKey: OpenPGPKey;
}

export const sign = async (data: string, privateKeys: OpenPGPKey | OpenPGPKey[]): Promise<string> => {
    const { signature } = await signMessage({
        data,
        privateKeys,
        armor: true,
        detached: true
    });
    return signature as string;
};

export const encryptUnsigned = async ({ message, privateKey }: UnsignedEncryptionPayload) => {
    const { data: encryptedToken } = await encryptMessage({
        data: message,
        privateKeys: privateKey,
        publicKeys: privateKey.toPublic()
    });
    return encryptedToken as string;
};

// TODO: move this to pmcrypto
export const getStreamMessage = (stream: ReadableStream<Uint8Array>) => {
    return openpgp.message.read(toPolyfillReadable(stream));
};

interface UnsignedDecryptionPayload {
    armoredMessage: string | Uint8Array;
    privateKey: OpenPGPKey;
}

/**
 * Decrypts unsigned armored message, in the context of drive it's share's passphrase and folder's contents.
 */
export const decryptUnsigned = async ({ armoredMessage, privateKey }: UnsignedDecryptionPayload) => {
    const { data: decryptedMessage } = await decryptMessage({
        message: await getMessage(armoredMessage),
        privateKeys: privateKey,
        publicKeys: privateKey.toPublic()
    });

    return decryptedMessage as string;
};

export const generateDriveKey = async (rawPassphrase: string) => {
    const encryptionConfigs = ENCRYPTION_CONFIGS[ENCRYPTION_TYPES.X25519];
    const { key: privateKey, privateKeyArmored } = await generateKey({
        userIds: [{ name: 'Drive key' }],
        passphrase: rawPassphrase,
        ...encryptionConfigs
    });

    await privateKey.decrypt(rawPassphrase);

    return { privateKey, privateKeyArmored };
};

export const generateLookupHash = async (name: string, hashKey: string) => {
    const key = await crypto.subtle.importKey(
        'raw',
        binaryStringToArray(hashKey),
        { name: 'HMAC', hash: 'SHA-256' },
        false,
        ['sign', 'verify']
    );

    const signature = await crypto.subtle.sign(
        { name: 'HMAC', hash: { name: 'SHA-256' } },
        key,
        binaryStringToArray(name)
    );
    return arrayToHexString(new Uint8Array(signature));
};

export const generateNodeHashKey = async (privateKey: OpenPGPKey) => {
    const message = generatePassphrase();

    const NodeHashKey = await encryptUnsigned({
        message,
        privateKey
    });

    return { NodeHashKey };
};

export const generateNodeKeys = async (parentKey: OpenPGPKey, addressKey: OpenPGPKey = parentKey) => {
    const rawPassphrase = generatePassphrase();
    const { privateKey, privateKeyArmored: NodeKey } = await generateDriveKey(rawPassphrase);

    const { data: NodePassphrase, signature } = await encryptMessage({
        data: rawPassphrase,
        privateKeys: addressKey,
        publicKeys: parentKey.toPublic(),
        detached: true
    });

    return { privateKey, NodeKey, NodePassphrase, rawPassphrase, signature };
};

export const generateContentHash = async (content: Uint8Array) => {
    const data = await SHA256(content);
    return { HashType: 'sha256', BlockHash: arrayToHexString(data) as string };
};

export const generateContentKeys = async (nodeKey: OpenPGPKey) => {
    const publicKey = nodeKey.toPublic();
    const sessionKey = await createSessionKey(publicKey);
    const contentKeys = await getEncryptedSessionKey(sessionKey, publicKey);
    const ContentKeyPacket = serializeUint8Array(contentKeys);
    return { sessionKey, ContentKeyPacket };
};

export const generateDriveBootstrap = async (addressPrivateKey: OpenPGPKey) => {
    const {
        NodeKey: ShareKey,
        NodePassphrase: SharePassphrase,
        privateKey: sharePrivateKey,
        signature: SharePassphraseSignature
    } = await generateNodeKeys(addressPrivateKey);

    const {
        NodeKey: FolderKey,
        NodePassphrase: FolderPassphrase,
        privateKey: folderPrivateKey,
        signature: FolderPassphraseSignature
    } = await generateNodeKeys(sharePrivateKey, addressPrivateKey);

    const FolderName = await encryptUnsigned({
        message: 'root',
        privateKey: folderPrivateKey
    });

    return {
        bootstrap: {
            SharePassphrase,
            SharePassphraseSignature,
            FolderPassphrase,
            FolderPassphraseSignature,
            ShareKey,
            FolderKey,
            FolderName
        },
        sharePrivateKey
    };
};
