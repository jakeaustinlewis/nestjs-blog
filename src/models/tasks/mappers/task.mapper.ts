import { Entity } from 'typeorm';
import TaskStatus from '../../../common/enum/task-status.enum';
import { TaskDto } from '../dtos/task.dto';
import { Task } from '../entities/task.entity';

@Entity()
export class TaskMapper {
  public static toEntity(taskDto: TaskDto): Task {
    const task = new Task();
    task.status = taskDto.status || TaskStatus.Open;
    task.description = taskDto.description;
    task.title = taskDto.title;
    task.user = taskDto.user;

    return task;
  }

  public static fromEntity(task: Task): TaskDto {
    const taskDto = new TaskDto();
    taskDto.id = task.id;
    taskDto.status = task.status;
    taskDto.description = task.description;
    taskDto.title = task.title;
    taskDto.user = task.user;

    return taskDto;
  }

  public static toEntityUpdate(taskDto): Task {
    const task = new Task();

    if (taskDto.status) {
      task.status = taskDto.status;
    }

    if (taskDto.description) {
      task.description = taskDto.description;
    }

    if (taskDto.title) {
      task.title = taskDto.title;
    }

    return task;
  }
}
