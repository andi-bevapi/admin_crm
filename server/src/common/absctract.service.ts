import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/models/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export abstract class AbsctractService {

    protected constructor(protected readonly repository: Repository<any>) { }

    public async getAll(relations?): Promise<any> {
        const result = await this.repository.find({ relations: relations });
        return result;
    }

    public async register(data): Promise<any> {
        const result = await this.repository.save(data);
        return result;
    }

    public async findByEmail(email): Promise<any> {
        const result = await this.repository.findOneBy({ email })
        return result;
    }

    public async findOne(id: number, relations: string[] = []): Promise<any> {

        // console.log("relations---", relations);

        const result = await this.repository.findOne({
            relations,
            where: { id: id }
        })
        return result;
    }

    public async create(data): Promise<any> {
        const result = await this.repository.save(data);
        return result;
    }


    public async update(id: number, data) {
        const result = await this.repository.update(id, data);
        return result;
    }

    public async delete(id: number) {
        const result = await this.repository.delete(id);
        return result;
    }


    public async paginate(page: number, relations: string[] = []): Promise<{ data: any[], meta: { total: number, page: number, last_page: number } }> {
        const take = 4;
        const [data, total] = await this.repository.findAndCount({
            take,
            skip: (page - 1) * take,
            relations
        });

        return {
            data: data,
            meta: {
                total,
                page,
                last_page: Math.ceil(total / take)
            }
        }
    }
}
