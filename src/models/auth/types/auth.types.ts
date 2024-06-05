type TIdentifier = "email" | "phone"

type TUserIdentifier = { email: string } | { phone: string };

type TUserCriteria = {
    id?: number;
    email?: string;
    phone?: string;
}

type AccessTokenPayload = {
    userId: number;
    identifier: string;
    identifierType: TIdentifier;
}