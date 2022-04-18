import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UserDto } from './dtos/user.dto';
import { User } from './entities/user.entity';
import { UserMapper } from './mappers/user.mapper';

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
  async createUser(userDto: UserDto): Promise<void> {
    const { password } = userDto;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = UserMapper.toEntity({ ...userDto, password: hashedPassword });

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
