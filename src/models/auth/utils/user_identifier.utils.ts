import {IUserId} from "../../users/interface/user.interface";

export const userIdentifier = (payload: IUserId, email?: string): TUserIdentifier => {
    console.log('userIdentifier', payload, email)
    if (email && payload.email) {
        return { email: payload.email };
    } else if (payload.phone) {
        return { phone: payload.phone };
    } else {
        throw new Error('User identifier is not provided');
    }
};