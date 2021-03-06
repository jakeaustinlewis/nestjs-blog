import { Exclude } from 'class-transformer';
import {
  IsEmpty,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import HttpMethod from 'src/common/enum/http-method.enum';
import { User } from 'src/models/auth/entities/user.entity';
import TaskStatus from '../../../common/enum/task-status.enum';

export class TaskDto {
  @IsEmpty({ groups: [HttpMethod.Post] })
  id: string;

  @IsNotEmpty({ groups: [HttpMethod.Post] })
  @IsString({ groups: [HttpMethod.Post] })
  @IsOptional({ groups: [HttpMethod.Patch] })
  title: string;

  @IsNotEmpty({ groups: [HttpMethod.Post] })
  @IsString({ groups: [HttpMethod.Post] })
  @IsOptional({ groups: [HttpMethod.Patch] })
  description: string;

  @IsOptional({ groups: [HttpMethod.Post, HttpMethod.Patch] })
  @IsEnum(TaskStatus)
  status?: TaskStatus;

  @Exclude({ toPlainOnly: true })
  user: User;
}
