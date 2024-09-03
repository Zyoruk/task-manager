import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Task, TaskSchema } from "./task";

@Module({
    imports: [MongooseModule.forFeature([{ name: Task.name, schema: TaskSchema }])],  
    exports: [MongooseModule],
})
export class SchemasModule {}