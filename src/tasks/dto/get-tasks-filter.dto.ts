import { IsEnum, IsOptional, IsString } from 'class-validator';
import HttpMethod from 'src/common/enum/http-method.enum';
import TaskStatus from '../../common/enum/task-status.enum';

export class GetTaskFilterDto {
  @IsOptional({ groups: [HttpMethod.Get] })
  @IsEnum(TaskStatus, { groups: [HttpMethod.Get] })
  status?: TaskStatus;

  @IsOptional({ groups: [HttpMethod.Get] })
  @IsString({ groups: [HttpMethod.Get] })
  search?: string;
}
