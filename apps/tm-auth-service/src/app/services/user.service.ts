import { Injectable } from "@nestjs/common";
import { Model, Mongoose } from "mongoose";
import { User, UserDocument } from "../user/schemas/user.schema";
import { InjectModel } from "@nestjs/mongoose";
import { CreateUserDto } from "../user/dto/create-user.dto";

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>,){

    }

    findUserById(id: string): Promise<User> {
        return this.userModel.findById(id);
    }

    findBy(query: any): Promise<User> {
        return this.userModel.findOne(query);
    }
    
    create(user: CreateUserDto): Promise<User> {
        return this.userModel.create(user);
    }
}