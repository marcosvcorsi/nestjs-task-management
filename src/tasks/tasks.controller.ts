import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { FilterTasksDto } from './dto/filter-tasks.dto';
import { Task, TaskStatus } from './task.model';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  getAll(@Query() filterDto: FilterTasksDto): Task[] {
    return this.tasksService.getAll();
  }

  @Get('/:id')
  getById(@Param('id') id: string): Task {
    return this.tasksService.getById(id);
  }

  @Post()
  create(@Body() createTaskDto: CreateTaskDto): Task {
    return this.tasksService.create(createTaskDto);
  }

  @Delete('/:id')
  delete(@Param('id') id: string): void {
    return this.tasksService.delete(id);
  }

  @Patch('/:id/status')
  updateStatus(
    @Param('id') id: string,
    @Body('status') status: TaskStatus,
  ): Task {
    return this.tasksService.updateStatus(id, status);
  }
}
