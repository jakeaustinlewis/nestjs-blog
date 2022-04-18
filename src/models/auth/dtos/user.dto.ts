import {
  IsEmail,
  IsEmpty,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import HttpMethod from 'src/common/enum/http-method.enum';

export class UserDto {
  @IsEmpty({ groups: [HttpMethod.Post] })
  id: string;

  @IsNotEmpty({ groups: [HttpMethod.Post] })
  @IsEmail({ groups: [HttpMethod.Post, HttpMethod.Patch] })
  @IsOptional({ groups: [HttpMethod.Patch] })
  email: string;

  @IsNotEmpty({ groups: [HttpMethod.Post] })
  @IsOptional({ groups: [HttpMethod.Patch] })
  @MinLength(4, { groups: [HttpMethod.Post, HttpMethod.Patch] })
  @MaxLength(32, { groups: [HttpMethod.Post, HttpMethod.Patch] })
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    groups: [HttpMethod.Post, HttpMethod.Patch],
    message: 'password is weak',
  })
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
