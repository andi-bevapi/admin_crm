import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from "./models/user.entity";
import { UserUpdateDto } from "./models/user.update.dto";
import { Repository } from 'typeorm';
import { AbsctractService } from "../common/absctract.service";

@Injectable()
export class UsersService extends AbsctractService {
    constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {
        super(userRepository)
    }

    public async registerUser(data): Promise<User> {
        const result = await this.userRepository.save(data);
        return result;
    }

    public async paginate(page: number): Promise<any> {
        const {data,meta} = await super.paginate(page )

        return {
            data: data.map((user, index) => {

                const { password, ...data } = user;
                return data
            }),
            meta
        }
    }


}
