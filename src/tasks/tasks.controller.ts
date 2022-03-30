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
import { ValidationPipe } from '../common/pipes/validation.pipe';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from './task.model';
import { TasksService } from './tasks.service';
import { GetTaskFilterDto } from './dto/get-tasks-filter.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import HttpMethod from '../common/enum/http-method.enum';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getTasks(
    @Query(new ValidationPipe(HttpMethod.Get)) filterDto: GetTaskFilterDto,
  ): Task[] {
    if (Object.keys(filterDto).length) {
      return this.tasksService.getTasksWithFilters(filterDto);
    }
    return this.tasksService.getAllTasks();
  }

  @Get('/:id')
  getTask(@Param('id') id: string): Task {
    return this.tasksService.getTaskById(id);
  }

  @Post() createTask(
    @Body(new ValidationPipe(HttpMethod.Post)) createTaskDto: CreateTaskDto,
  ): Task {
    return this.tasksService.createTask(createTaskDto);
  }

  @Patch('/:id/status') updateTaskStatus(
    @Param('id') id: string,
    @Body(new ValidationPipe(HttpMethod.Patch))
    updateTaskStatusDto: UpdateTaskStatusDto,
  ): Task {
    const { status } = updateTaskStatusDto;
    return this.tasksService.updateTaskStatus(id, status);
  }

  @Delete('/:id') deleteTask(@Param('id') id: string): void {
    return this.tasksService.deleteTask(id);
  }
}
