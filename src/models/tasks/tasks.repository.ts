import { EntityRepository, Repository } from 'typeorm';
import { GetTasksFilterDto } from './dtos/get-tasks-filter.dto';
import { Task } from './entities/task.entity';

@EntityRepository(Task)
export class TasksRepository extends Repository<Task> {
  async getTasks(filterDto: GetTasksFilterDto): Promise<Task[]> {
    const { status, search, limit, offset } = filterDto;

    const query = this.createQueryBuilder('task');

    if (status) {
      query.andWhere('task.status = :status', { status });
    }

    if (search) {
      // LIKE means a partial match
      query.andWhere(
        'LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search)',
        { search: `%${search}%` },
      );
    }

    if (limit) {
      query.take(limit);
    }
    if (offset) {
      query.skip(offset);
    }

    const tasks = await query.getMany();
    return tasks;
  }
}
