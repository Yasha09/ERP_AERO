import {AppDataSource} from "../../data-source";
import {User} from "../../entity/User.entity";
import {ISignupRequest, IUser} from "../auth/interface";

class UserService {

    async userInfo(id: number): Promise<User> {
        const user = await this.getOne({id});
        if (!user) {
            throw new Error('User not found');
        }
        return user;
    }

    async getOne(credential: TUserCriteria): Promise<User | null> {
        const userRepository = AppDataSource.getRepository(User);

        return userRepository.findOne({
            where: credential
        });
    }

    async createOne(data: ISignupRequest): Promise<User> {
        const userRepository = AppDataSource.getRepository(User);

        const user = userRepository.create(data);

        return userRepository.save(user);
    }

    userDTO(user: User): IUser {
        return {
            id: user.id,
            email: user.email,
            name: user.name
        }
    }
}

const userService = new UserService();
export default userService;
