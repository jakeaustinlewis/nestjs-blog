import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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

  public async getTasks(filterDto?: GetTasksFilterDto): Promise<Task[]> {
    const tasks = await this.tasksRepo.getTasks(filterDto);
    return tasks.map((task) => TaskMapper.fromEntity(task));
  }

  public async getTaskById(id: string): Promise<Task> {
    const task = await this.tasksRepo.findOne({ id });

    if (!task) {
      throw new NotFoundException(`task with ID "${id}" not found`);
    }
    return TaskMapper.fromEntity(task);
  }

  public async createTask(taskDto: TaskDto): Promise<Task> {
    const task = TaskMapper.toEntity(taskDto);
    await this.tasksRepo.save(task);
    return TaskMapper.fromEntity(task);
  }

  public async updateTask(id: string, taskDto: TaskDto): Promise<TaskDto> {
    const task = await this.getTaskById(id);
    const taskToUpdate = TaskMapper.toEntityUpdate(taskDto);

    const updatedTask = { ...task, ...taskToUpdate };

    await this.tasksRepo.save(updatedTask);

    return TaskMapper.fromEntity(updatedTask);
  }

  public async deleteTask(id: string): Promise<void> {
    const { affected } = await this.tasksRepo.delete(id);

    if (affected !== 1) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
  }
}
