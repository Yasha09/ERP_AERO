import {User} from "../../../entity/User.entity";
import {IUserId} from "../../users/interface/user.interface";

export interface ISignupRequest extends IUserId {
    password: string;
    name: string;
}

export interface ISignInRequest extends IUserId {
    password: string;
}

// todo need to change
export interface ISignInPayload {
    user: User,
    deviceId: string
}


export interface ISignInResponse {
    user: IUser,
    accessToken: string,
    refreshToken: string
}


export interface IUser {
    id: string;
    name: string;
    userId: number;
}

export interface IUserResponse {
    id: number;
    email: string;
    name: string;
}

export interface IRefreshTokenPayload {
    userId: number;
    name: string;
    id: string;
}

