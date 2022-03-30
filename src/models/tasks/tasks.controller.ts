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
import { ValidationPipe } from '../../common/pipes/validation.pipe';
import { CreateTaskDto } from './dtos/create-task.dto';
import { Task } from './entities/task.entity';
import { TasksService } from './tasks.service';
import { GetTasksFilterDto } from './dtos/get-tasks-filter.dto';
import { UpdateTaskStatusDto } from './dtos/update-task-status.dto';
import HttpMethod from '../../common/enum/http-method.enum';
import { TaskDto } from './dtos/task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  // @Get()
  // getTasks(
  //   @Query(new ValidationPipe(HttpMethod.Get)) filterDto: GetTasksFilterDto,
  // ): Task[] {
  //   if (Object.keys(filterDto).length) {
  //     return this.tasksService.getTasksWithFilters(filterDto);
  //   }
  //   return this.tasksService.getAllTasks();
  // }

  @Get('/:id')
  getTask(@Param('id') id: string): Promise<Task> {
    return this.tasksService.getTaskById(id);
  }

  @Post() createTask(
    @Body(new ValidationPipe(HttpMethod.Post)) createTaskDto: TaskDto,
  ): Promise<TaskDto> {
    return this.tasksService.createTask(createTaskDto);
  }

  // @Patch('/:id/status') updateTaskStatus(
  //   @Param('id') id: string,
  //   @Body(new ValidationPipe(HttpMethod.Patch))
  //   updateTaskStatusDto: UpdateTaskStatusDto,
  // ): Task {
  //   const { status } = updateTaskStatusDto;
  //   return this.tasksService.updateTaskStatus(id, status);
  // }

  @Delete('/:id') deleteTask(@Param('id') id: string): Promise<void> {
    console.log('id: ', id);
    return this.tasksService.deleteTask(id);
  }
}
