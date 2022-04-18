import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { UserDto } from './dtos/user.dto';
import { User } from './entities/user.entity';
import { UserMapper } from './mappers/user.mapper';

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
  async createUser(userDto: UserDto): Promise<void> {
    const user = UserMapper.toEntity(userDto);

    try {
      await this.save(user);
    } catch (error) {
      if (error.code === '23505') {
        // duplicate username

        throw new ConflictException('Email already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
