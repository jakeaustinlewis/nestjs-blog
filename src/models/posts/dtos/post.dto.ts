import { Exclude } from 'class-transformer';
import { IsEmpty, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import type { User } from 'src/models/auth/entities/user.entity';
import HttpMethod from '../../../common/enum/http-method.enum';

export class PostDto {
  @IsEmpty({ groups: [HttpMethod.Post] })
  id: string;

  @IsNotEmpty({ groups: [HttpMethod.Post] })
  @IsString({ groups: [HttpMethod.Post, HttpMethod.Patch] })
  @IsOptional({ groups: [HttpMethod.Patch] })
  title?: string;

  @IsNotEmpty({ groups: [HttpMethod.Post] })
  @IsString({ groups: [HttpMethod.Post, HttpMethod.Patch] })
  @IsOptional({ groups: [HttpMethod.Patch] })
  description?: string;

  @IsNotEmpty({ groups: [HttpMethod.Post] })
  @IsString({ groups: [HttpMethod.Post, HttpMethod.Patch] })
  @IsOptional({ groups: [HttpMethod.Patch] })
  image?: string;

  @Exclude({ toPlainOnly: true })
  user: User;

  @IsEmpty({ groups: [HttpMethod.Post] })
  createdAt: Date;

  @IsEmpty({ groups: [HttpMethod.Post] })
  updatedAt?: Date;
}
