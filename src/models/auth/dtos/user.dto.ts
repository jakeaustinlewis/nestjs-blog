import { IsEmpty, IsOptional, IsString } from 'class-validator';
import HttpMethod from 'src/common/enum/http-method.enum';
import { AuthCredentialsDto } from './auth-credentials.dto';

export class UserDto extends AuthCredentialsDto {
  @IsEmpty({ groups: [HttpMethod.Post] })
  id: string;

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
