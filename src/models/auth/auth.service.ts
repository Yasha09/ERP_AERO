import userService from "../users/user.service";
import {User} from "../../entity/User.entity";
import {comparePasswords, setPassword} from "./utils/bcrypt.utils";
import accessTokenService from "./accessToken.service";
import {Exception} from "../../errorHandler/exception";
import {HTTPStatus} from "../../errorHandler/types";
import {userIdentifier} from "./utils/user_identifier.utils";
import {ISignInPayload, ISignInRequest, ISignupRequest, ISignInResponse, IUserResponse} from "./interface";
import refreshTokenService from "./refreshToken.service";
import errorMessages from "../../common/constants/errorMessages";


class AuthService {
    async signUp(userData: ISignupRequest): Promise<void> {
        const {password, email, name, phone} = userData;

        const id: TUserIdentifier = userIdentifier(userData, email);
        const user: User | null = await userService.getOne(id);

        if (user) {
            throw new Exception(HTTPStatus.Conflict, {message: errorMessages.userExists});
        }

        const hashedPassword: string = await setPassword(password);

        await userService.createOne({
            name,
            password: hashedPassword,
            ...id
        });
    }


    async signIn(signInData: ISignInPayload): Promise<ISignInResponse> {
        const {user, deviceId} = signInData;

        const [accessToken, refreshToken] = await Promise.all([
            accessTokenService.createOne(user),
            refreshTokenService.createOne({
                userId: user.id,
                deviceId
            })
        ])

        return {
            user: userService.userDTO(user),
            accessToken,
            refreshToken
        }
    }

    async validateUserCredentials(signInData: ISignInRequest): Promise<User> {
        const {password, email} = signInData;
        const id: TUserIdentifier = userIdentifier(signInData, email);
        const user: User | null = await userService.getOne(id);

        if (!user) {
            throw new Exception(HTTPStatus.Unauthorized, {message: 'User not found'});
        }

        const isPasswordCorrect: boolean = await comparePasswords(password, user.password);

        if (!isPasswordCorrect) {
            throw new Exception(HTTPStatus.Unauthorized, {message: 'Invalid password'});
        }

        return user;
    }

}


const authService = new AuthService();
export default authService;
