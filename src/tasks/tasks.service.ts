import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAll(): Task[] {
    return this.tasks;
  }

  getById(id: string): Task {
    return this.tasks.find((task) => task.id === id);
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
    this.tasks = this.tasks.filter((task) => task.id !== id);
  }

  updateStatus(id: string, status: TaskStatus): Task {
    const task = this.getById(id);

    task.status = status;

    return task;
  }
}
