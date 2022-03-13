import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { FilterTasksDto } from './dto/filter-tasks.dto';
import { TasksRepository } from './taks.repository';
import { Task, TaskStatus } from './task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TasksRepository)
    private readonly tasksRepository: TasksRepository,
  ) {}

  getAll(filter: FilterTasksDto): Task[] {
    // const { search, status } = filter;
    // if (search || status) {
    //   return this.tasks.filter(
    //     (task) =>
    //       (status && task.status === status) ||
    //       (search && task.title.toLowerCase().includes(search.toLowerCase())) ||
    //       task.description.toLowerCase().includes(search.toLowerCase()),
    //   );
    // }
    // return this.tasks;
    return [];
  }

  async getById(id: string): Promise<Task> {
    const task = await this.tasksRepository.findOne(id);

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    return task;
  }

  create({ title, description }: CreateTaskDto): Task {
    // const task: Task = {
    //   id: uuid(),
    //   title,
    //   description,
    //   status: TaskStatus.OPEN,
    // };
    // this.tasks.push(task);
    // return task;

    return null;
  }

  delete(id: string): void {
    // this.getById(id);
    // this.tasks = this.tasks.filter((task) => task.id !== id);
  }

  updateStatus(id: string, status: TaskStatus): Task {
    // const task = this.getById(id);
    // task.status = status;
    // return task;

    return null;
  }
}
