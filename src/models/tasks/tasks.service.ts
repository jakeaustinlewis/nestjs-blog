import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { v4 as uuid } from 'uuid';
import TaskStatus from '../../common/enum/task-status.enum';
import { CreateTaskDto } from './dtos/create-task.dto';
import { GetTasksFilterDto } from './dtos/get-tasks-filter.dto';
import { TaskDto } from './dtos/task.dto';
import { Task } from './entities/task.entity';
import { TaskMapper } from './mappers/task.mapper';
import { TasksRepository } from './tasks.repository';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TasksRepository)
    private tasksRepo: TasksRepository,
  ) {}

  private tasks: Task[] = [];

  // public getAllTasks(): Task[] {
  //   return this.tasks;
  // }

  public async getTaskById(id: string): Promise<Task> {
    const task = await this.tasksRepo.findOne({ id });

    if (!task) {
      throw new NotFoundException(`task with ID "${id}" not found`);
    }
    return TaskMapper.fromEntity(task);
  }

  // public getTasksWithFilters(filterDto: GetTasksFilterDto): Task[] {
  //   const { status, search } = filterDto;
  //   let tasks = this.getAllTasks();
  //   if (status) {
  //     tasks = tasks.filter((task) => task.status === status);
  //   }
  //   if (search) {
  //     tasks = tasks.filter((task) => {
  //       if (task.title.includes(search) || task.description.includes(search)) {
  //         return true;
  //       }
  //       return false;
  //     });
  //   }
  //   return tasks;
  // }

  public async createTask(taskDto: TaskDto): Promise<Task> {
    const task = TaskMapper.toEntity(taskDto);
    await this.tasksRepo.save(task);
    return TaskMapper.fromEntity(task);
  }

  // public updateTaskStatus(id: string, status: TaskStatus): Task {
  //   const task = this.getTaskById(id);
  //   task.status = status;
  //   return task;
  // }

  public async deleteTask(id: string): Promise<void> {
    const result = await this.tasksRepo.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
  }
}
