import {Request} from 'express';

import {User} from "../../entity/User.entity";


export interface AuthRequest extends Request {
    user: User
}

