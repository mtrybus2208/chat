import { User } from '../../entity/user/user.entity';
import { UserDto } from '../../dto/user/user.dto';

export class UserDataMapper {
  public static toEntity(userDto: UserDto): User {
    const newUser = new User();
    newUser.name = userDto.userName;
    newUser.gender = userDto.gender;
    newUser.age = userDto.age;

    return newUser;
  }
}
