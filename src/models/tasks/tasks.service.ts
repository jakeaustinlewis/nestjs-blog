import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import TaskStatus from '../../common/enum/task-status.enum';
import { CreateTaskDto } from './dtos/create-task.dto';
import { GetTasksFilterDto } from './dtos/get-tasks-filter.dto';
import { Task } from './entities/task.entity';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  public getAllTasks(): Task[] {
    return this.tasks;
  }

  public getTaskById(id: string): Task {
    const task = this.tasks.find((tk) => tk.id === id);
    if (!task) {
      throw new NotFoundException(`task with ID "${id}" not found`);
    }
    return task;
  }

  public getTasksWithFilters(filterDto: GetTasksFilterDto): Task[] {
    const { status, search } = filterDto;
    let tasks = this.getAllTasks();
    if (status) {
      tasks = tasks.filter((task) => task.status === status);
    }
    if (search) {
      tasks = tasks.filter((task) => {
        if (task.title.includes(search) || task.description.includes(search)) {
          return true;
        }
        return false;
      });
    }
    return tasks;
  }

  // eslint-disable-next-line class-methods-use-this
  public createTask(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;

    // const task = tasksRepository.create({
    //   title,
    //   description,
    //   status: TaskStatus.Open,
    // });
    // const task: Task = {
    //   id: uuid(),
    //   title,
    //   description,
    //   status: TaskStatus.Open,
    // };
    // this.tasks.push(task);
    return new Task();
  }

  public updateTaskStatus(id: string, status: TaskStatus): Task {
    const task = this.getTaskById(id);
    task.status = status;
    return task;
  }

  public deleteTask(id: string): void {
    this.getTaskById(id);
    this.tasks = this.tasks.filter((task) => task.id !== id);
  }
}
