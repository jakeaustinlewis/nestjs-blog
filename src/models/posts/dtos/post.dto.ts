import { IsEmpty, IsNotEmpty, IsOptional, IsString } from 'class-validator';
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

  @IsEmpty({ groups: [HttpMethod.Post] })
  createdAt: Date;

  @IsEmpty({ groups: [HttpMethod.Post] })
  updatedAt?: Date;
}
