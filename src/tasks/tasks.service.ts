import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { FilterTasksDto } from './dto/filter-tasks.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAll(filter: FilterTasksDto): Task[] {
    const { search, status } = filter;

    if (search || status) {
      return this.tasks.filter(
        (task) =>
          (status && task.status === status) ||
          (search && task.title.toLowerCase().includes(search.toLowerCase())) ||
          task.description.toLowerCase().includes(search.toLowerCase()),
      );
    }

    return this.tasks;
  }

  getById(id: string): Task {
    const task = this.tasks.find((task) => task.id === id);

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    return task;
  }

  create({ title, description }: CreateTaskDto): Task {
    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };

    this.tasks.push(task);

    return task;
  }

  delete(id: string): void {
    this.getById(id);

    this.tasks = this.tasks.filter((task) => task.id !== id);
  }

  updateStatus(id: string, status: TaskStatus): Task {
    const task = this.getById(id);

    task.status = status;

    return task;
  }
}
