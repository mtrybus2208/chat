import { JsonController, Param, Body, Get, Post, Put, Delete, HttpCode } from 'routing-controllers';

import { ErrorGenerator } from '../lib/errorHandling/ErrorGenerator';
import { invalidDataInformation } from '../lib/errorHandling/errorMessage';
import { UserService } from '../service/user/user.service';
import { UserDataMapper } from '../dataMapper/user/user.dataMapper';
import { User } from '../entity/user/user.entity';
import { UserDto } from '../dto/user/user.dto';

@JsonController()
export class UsersController {
  constructor(private readonly userService: UserService) {}

  @Get('/users')
  getAll(): string {
    return 'This action returns all users';
  }

  @Get('/users/:id')
  async getOne(@Param('id') id: number): Promise<any> {
    try {
      console.log('...');
      throw new Error('custom error');
    } catch (error) {
      throw ErrorGenerator.createError(invalidDataInformation.code, invalidDataInformation.message);
    }
  }

  @Post('/users')
  @HttpCode(201)
  async post(@Body() userDto: UserDto): Promise<string> {
    const user: User = UserDataMapper.toEntity(userDto);
    const res = await this.userService.createUser(user);
    console.log({ res });
    return 'Saving user...';
  }

  @Put('/users/:id')
  put(@Param('id') id: number, @Body() user: any): string {
    return 'Updating a user...';
  }

  @Delete('/users/:id')
  remove(@Param('id') id: number): string {
    return 'Removing user...';
  }
}
