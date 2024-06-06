import {AppDataSource} from "../../data-source";
import {User} from "../../entity/User.entity";
import {ISignupRequest, IUser} from "../auth/interface";

class UserService {

    async userInfo(id: number): Promise<IUser> {
        const user: User | null = await this.getOne({id});
        if (!user) {
            throw new Error('User not found');
        }
        return this.userDTO(user);
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
            userId: user.id,
            id: user.email ?? user.phone,
            name: user.name
        }
    }
}

const userService = new UserService();
export default userService;
