import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import HttpMethod from 'src/common/enum/http-method.enum';

export class AuthCredentialsDto {
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
}
