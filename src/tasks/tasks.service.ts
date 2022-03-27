import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';
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

  getAll(filter: FilterTasksDto, user: User): Promise<Task[]> {
    return this.tasksRepository.getTasks(filter, user);
  }

  async getById(id: string, user: User): Promise<Task> {
    const task = await this.tasksRepository.findOne({
      where: {
        id,
        user,
      },
    });

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    return task;
  }

  async create(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    return this.tasksRepository.createTask(createTaskDto, user);
  }

  async delete(id: string, user: User): Promise<void> {
    const { affected } = await this.tasksRepository.softDelete({ id, user });

    if (!affected) {
      throw new NotFoundException('Task not found');
    }
  }

  async updateStatus(
    id: string,
    status: TaskStatus,
    user: User,
  ): Promise<Task> {
    const task = await this.getById(id, user);

    task.status = status;

    return this.tasksRepository.save(task);
  }
}
