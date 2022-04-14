import { IsEmpty, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import HttpMethod from 'src/common/enum/http-method.enum';

export class UserDto {
  @IsEmpty({ groups: [HttpMethod.Post] })
  id: string;

  @IsNotEmpty({ groups: [HttpMethod.Post] })
  @IsString({ groups: [HttpMethod.Post, HttpMethod.Patch] })
  @IsOptional({ groups: [HttpMethod.Patch] })
  email: string;

  @IsNotEmpty({ groups: [HttpMethod.Post] })
  @IsString({ groups: [HttpMethod.Post, HttpMethod.Patch] })
  @IsOptional({ groups: [HttpMethod.Patch] })
  password: string;

  @IsString({ groups: [HttpMethod.Post, HttpMethod.Patch] })
  @IsOptional({ groups: [HttpMethod.Post, HttpMethod.Patch] })
  firstName?: string;

  @IsString({ groups: [HttpMethod.Post, HttpMethod.Patch] })
  @IsOptional({ groups: [HttpMethod.Post, HttpMethod.Patch] })
  lastName?: string;

  @IsEmpty({ groups: [HttpMethod.Post] })
  createdAt: Date;

  @IsEmpty({ groups: [HttpMethod.Post] })
  updatedAt?: Date;
}
