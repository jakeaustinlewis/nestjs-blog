import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { UserDto } from './dtos/user.dto';
import { UsersRepository } from './users.repository';
import { AuthCredentialsDto } from './dtos/auth-credentials.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UsersRepository)
    private usersRepo: UsersRepository,
  ) {}

  async signUp(userDto: UserDto): Promise<void> {
    return this.usersRepo.createUser(userDto);
  }

  async signIn(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { email, password } = authCredentialsDto;
    const user = await this.usersRepo.findOne({ email });

    if (!(user && (await bcrypt.compare(password, user.password)))) {
      throw new UnauthorizedException('Please check your login credentials');
    }
  }
}
