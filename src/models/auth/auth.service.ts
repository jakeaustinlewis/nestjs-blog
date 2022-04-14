import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDto } from './dtos/user.dto';
import { UsersRepository } from './users.repository';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UsersRepository)
    private usersRepo: UsersRepository,
  ) {}

  async signUp(userDto: UserDto): Promise<void> {
    return this.usersRepo.createUser(userDto);
  }
}
