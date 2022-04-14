import { EntityRepository, Repository } from 'typeorm';
import { UserDto } from './dtos/user.dto';
import { User } from './entities/user.entity';
import { UserMapper } from './mappers/user.mapper';

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
  async createUser(userDto: UserDto): Promise<void> {
    const user = UserMapper.toEntity(userDto);
    await this.save(user);
  }
}
