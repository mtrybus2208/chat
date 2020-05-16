import { Controller, Param, Body, Get, Post, Put, Delete } from 'routing-controllers';

import { ErrorGenerator } from '../lib/errorHandling/ErrorGenerator';
import { invalidDataInformation } from '../lib/errorHandling/errorMessage';

@Controller()
export class UsersController {
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
  post(@Body() user: any): string {
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
