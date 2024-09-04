import { Injectable } from '@nestjs/common';
import { Model, Mongoose, UpdateWriteOpResult } from 'mongoose';
import { User, UserDocument } from '../schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from '../dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  findUserById(id: string): Promise<UserDocument> {
    return this.userModel.findById(id);
  }

  findBy(query: any): Promise<UserDocument> {
    return this.userModel.findOne(query);
  }

  create(user: CreateUserDto): Promise<UserDocument> {
    return this.userModel.create(user);
  }

  async save(user: User): Promise<UpdateWriteOpResult> {
    return await this.userModel
      .updateOne({ email: user.email }, user, { upsert: true })
      .exec();
  }
}
