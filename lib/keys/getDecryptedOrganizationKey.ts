import { decryptPrivateKey, OpenPGPKey } from 'pmcrypto';

export interface OrganizationKeyResponse {
    PrivateKey?: string;
    PublicKey: string;
}

export interface OrganizationKey {
    Key: OrganizationKeyResponse;
    privateKey?: OpenPGPKey;
    error?: Error;
}

export const getDecryptedOrganizationKey = async ({
    keyPassword,
    Key,
}: {
    keyPassword: string;
    Key: OrganizationKeyResponse;
}): Promise<OrganizationKey> => {
    if (!Key.PrivateKey) {
        return {
            Key,
        };
    }
    try {
        const privateKey = await decryptPrivateKey(Key.PrivateKey, keyPassword);
        return {
            Key,
            privateKey,
        };
    } catch (e) {
        return {
            Key,
            error: e,
        };
    }
};
