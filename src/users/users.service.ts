import { Injectable } from '@nestjs/common';
import { User, UserDocument } from './users.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) { }

    async findByEmail(email: string): Promise<User | null> {
        return this.userModel.findOne({ email }).exec();
    }

    async create(data: Partial<User>): Promise<User> {
        return this.userModel.create({ ...data, provider: 'local', role: 'owner' });
    }

    async findById(id: string): Promise<User | null> {
        return this.userModel.findById(id).exec();
    }
}
