import { Entity } from 'typeorm';
import { UserDto } from '../dtos/user.dto';
import { User } from '../entities/user.entity';

@Entity()
export class UserMapper {
  public static toEntity(userDto: UserDto): User {
    const user = new User();
    user.email = userDto.email;
    user.password = userDto.password;
    user.firstName = userDto.firstName;
    user.lastName = userDto.lastName;

    return user;
  }

  public static fromEntity(user: User): UserDto {
    const userDto = new UserDto();
    userDto.id = user.id;
    userDto.email = user.email;
    userDto.password = user.password;
    userDto.firstName = user.firstName;
    userDto.lastName = user.lastName;
    userDto.createdAt = user.createdAt;
    userDto.updatedAt = user.updatedAt;

    return userDto;
  }

  public static toEntityUpdate(userDto): User {
    const user = new User();

    if (userDto.email) {
      user.email = userDto.email;
    }

    if (userDto.firstName) {
      user.firstName = userDto.firstName;
    }

    if (userDto.lastName) {
      user.lastName = userDto.lastName;
    }

    user.updatedAt = new Date();

    return user;
  }
}
