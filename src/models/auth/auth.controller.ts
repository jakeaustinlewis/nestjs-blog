import { Body, Controller, Post } from '@nestjs/common';
import HttpMethod from 'src/common/enum/http-method.enum';
import { ValidationPipe } from '../../common/pipes/validation.pipe';
import { AuthService } from './auth.service';
import { UserDto } from './dtos/user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(
    @Body(new ValidationPipe(HttpMethod.Post)) userDto: UserDto,
  ): Promise<void> {
    return this.authService.signUp(userDto);
  }
}
