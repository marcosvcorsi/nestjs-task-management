import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateTaskDto } from './dto/create-task.dto';
import { FilterTasksDto } from './dto/filter-tasks.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { Task } from './task.entity';
import { TasksService } from './tasks.service';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  async getAll(@Query() filterDto: FilterTasksDto): Promise<Task[]> {
    return this.tasksService.getAll(filterDto);
  }

  @Get('/:id')
  async getById(@Param('id') id: string): Promise<Task> {
    return this.tasksService.getById(id);
  }

  @Post()
  async create(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this.tasksService.create(createTaskDto);
  }

  @Delete('/:id')
  async delete(@Param('id') id: string): Promise<void> {
    return this.tasksService.delete(id);
  }

  @Patch('/:id/status')
  async updateStatus(
    @Param('id') id: string,
    @Body() { status }: UpdateTaskStatusDto,
  ): Promise<Task> {
    return this.tasksService.updateStatus(id, status);
  }
}
