import { Type } from 'class-transformer';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import HttpMethod from 'src/common/enum/http-method.enum';
import TaskStatus from '../../../common/enum/task-status.enum';

export class GetTasksFilterDto {
  @IsOptional({ groups: [HttpMethod.Get] })
  @Type(() => Number)
  limit?: number;

  @IsOptional({ groups: [HttpMethod.Get] })
  @Type(() => Number)
  offset?: number;

  @IsOptional({ groups: [HttpMethod.Get] })
  @IsEnum(TaskStatus, { groups: [HttpMethod.Get] })
  status?: TaskStatus;

  @IsOptional({ groups: [HttpMethod.Get] })
  @IsString({ groups: [HttpMethod.Get] })
  search?: string;
}
