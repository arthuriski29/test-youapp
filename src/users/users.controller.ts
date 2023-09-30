import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  Put,
  Delete,
  Res,
  HttpStatus,
  UseGuards,
  Req,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { Users } from './schema/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersInterface } from './interface/users.interface.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('api')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/createProfile')
  @UseGuards(AuthGuard())
  async create(
    @Req() request,
    @Res() response,
    @Body() createUserDto: CreateUserDto,
  ): Promise<UsersInterface> {
    try {
      const newProfile = await this.usersService.create(
        createUserDto,
        request.user,
      );
      return response.status(HttpStatus.CREATED).json({
        message: 'Profile has been created succesfully',
        newProfile,
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error Profile Not Created',
        error: 'Bad Request',
      });
    }
  }

  @Get('/getProfile')
  async getAllUsers(@Res() response): Promise<UsersInterface[]> {
    try {
      const profileData = await this.usersService.findAll();
      return response.status(HttpStatus.OK).json({
        message: 'Profile has been found',
        profileData,
      });
    } catch (error) {
      return response.status(error.status).json(error.response);
    }
  }

  @Get('/getOneProfile/:id')
  async getOneUser(@Res() response, @Param('id') id: string) {
    try {
      const profileData = await this.usersService.findOne(id);
      return response.status(HttpStatus.OK).json({
        message: 'Profile has been found',
        profileData,
      });
    } catch (error) {
      return response.status(error.status).json(error.response);
    }
  }

  @Put('/updateProfile/:id')
  async updateById(
    @Res() response,
    @Param('id') id: string,
    @Body('user') updateUserDto: UpdateUserDto,
  ) {
    try {
      const existingProfile = await this.usersService.updateById(
        id,
        updateUserDto,
      );
      return response.status(HttpStatus.OK).json({
        message: 'Profile has been updated',
        existingProfile,
      });
    } catch (error) {
      return response.status(error.status).json(error.response);
    }
  }

  @Delete('/deleteProfile/:id')
  async deleteById(@Res() response, @Param('id') id: string): Promise<Users> {
    try {
      await this.usersService.deleteById(id);
      return response.status(HttpStatus.OK).json({
        message: `Profile with id #${id}has been deleted`,
      });
    } catch (error) {
      return response.status(error.status).json(error.response);
    }
  }
}
