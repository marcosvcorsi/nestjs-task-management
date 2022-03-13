import { IsEnum } from 'class-validator';
import { TaskStatus } from '../task.entity';

export class UpdateTaskStatusDto {
  @IsEnum(TaskStatus)
  status: TaskStatus;
}
