import { PickType } from "@nestjs/swagger";
import { TaskDTO } from "./task.dto";

export class DeletedTaskDTO extends PickType(TaskDTO, ["taskId"]) {}