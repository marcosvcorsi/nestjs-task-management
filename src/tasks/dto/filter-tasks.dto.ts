import { TaskStatus } from '../task.model';

export class FilterTasksDto {
  status?: TaskStatus;
  search?: string;
}
