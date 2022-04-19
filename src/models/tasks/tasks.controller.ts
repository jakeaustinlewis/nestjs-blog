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
import { ValidationPipe } from '../../common/pipes/validation.pipe';
import { Task } from './entities/task.entity';
import { TasksService } from './tasks.service';
import HttpMethod from '../../common/enum/http-method.enum';
import { TaskDto } from './dtos/task.dto';
import { GetTasksFilterDto } from './dtos/get-tasks-filter.dto';
import { CollectionResponse } from '../../common/dtos/collection-response.dto';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  async getTasks(
    @Query(new ValidationPipe(HttpMethod.Get)) filterDto: GetTasksFilterDto,
  ): Promise<CollectionResponse<GetTasksFilterDto>> {
    const tasks = await this.tasksService.getTasks(filterDto);
    return new CollectionResponse(tasks, tasks.length);
  }

  @Get('/:id')
  getTask(@Param('id') id: string): Promise<Task> {
    return this.tasksService.getTaskById(id);
  }

  @Post() createTask(
    @Body(new ValidationPipe(HttpMethod.Post)) createTaskDto: TaskDto,
  ): Promise<TaskDto> {
    return this.tasksService.createTask(createTaskDto);
  }

  @Patch('/:id') async updateTask(
    @Param('id') id: string,
    @Body(new ValidationPipe(HttpMethod.Patch))
    taskDto: TaskDto,
  ): Promise<Task> {
    return this.tasksService.updateTask(id, taskDto);
  }

  @Delete('/:id') deleteTask(@Param('id') id: string): Promise<void> {
    return this.tasksService.deleteTask(id);
  }
}
