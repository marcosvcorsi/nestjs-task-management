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
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
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
  async getAll(
    @Query() filterDto: FilterTasksDto,
    @GetUser() user: User,
  ): Promise<Task[]> {
    return this.tasksService.getAll(filterDto, user);
  }

  @Get('/:id')
  async getById(@Param('id') id: string, @GetUser() user: User): Promise<Task> {
    return this.tasksService.getById(id, user);
  }

  @Post()
  async create(
    @Body() createTaskDto: CreateTaskDto,
    @GetUser() user: User,
  ): Promise<Task> {
    return this.tasksService.create(createTaskDto, user);
  }

  @Delete('/:id')
  async delete(@Param('id') id: string, @GetUser() user: User): Promise<void> {
    return this.tasksService.delete(id, user);
  }

  @Patch('/:id/status')
  async updateStatus(
    @Param('id') id: string,
    @Body() { status }: UpdateTaskStatusDto,
    @GetUser() user: User,
  ): Promise<Task> {
    return this.tasksService.updateStatus(id, status, user);
  }
}
