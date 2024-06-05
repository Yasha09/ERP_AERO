import {User} from "../../../entity/User.entity";

export type IUser = Pick<User, 'id' | 'name' | 'email' | 'phone' >;

export interface IUserId {
    email?: string;
    phone?: string;
}