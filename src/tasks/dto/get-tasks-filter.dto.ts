import TaskStatus from '../../common/enum/task-status.enum';

export class GetTaskFilterDto {
  status?: TaskStatus;

  search?: string;
}
