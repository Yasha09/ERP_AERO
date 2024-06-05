export type TRefreshTokenPayload = {
    userId: number,
    deviceId: string,
}


export type TRefreshTokenResponse = {
    accessToken: string;
    refreshToken: string;
}