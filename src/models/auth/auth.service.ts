import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersRepository } from './users.repository';

@Injectable()
export class AuthService {
  @InjectRepository(UsersRepository)
  constructor(private usersRepo: UsersRepository);
}
