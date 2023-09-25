import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Users } from './schema/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersInterface } from './interface/users.interface.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Auth } from 'src/auth/schemas/auth.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(Users.name)
    private usersModel: mongoose.Model<Users>,
  ) {}

  async create(
    createUserDto: CreateUserDto,
    user: Auth,
  ): Promise<UsersInterface> {
    const data = Object.assign(createUserDto, { user: user._id });

    const newProfile = await this.usersModel.create(data);
    return newProfile.save();
  }

  async findAll(): Promise<UsersInterface[]> {
    const profileData = await this.usersModel.find();
    if (!profileData || profileData.length === 0) {
      throw new NotFoundException('Profile Data Not Found');
    }
    return profileData;
  }

  async findOne(profileId: string): Promise<UsersInterface> {
    const existingProfile = await this.usersModel.findById(profileId);
    if (!existingProfile) {
      throw new NotFoundException(`Profile with id #${profileId} not found`);
    }
    return existingProfile;
  }

  async updateById(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UsersInterface> {
    const existingProfile = await this.usersModel.findByIdAndUpdate(
      id,
      updateUserDto,
      {
        new: true,
      },
    );
    if (!existingProfile) {
      throw new NotFoundException(`Profile with id #${id} no found`);
    }
    return existingProfile;
  }

  async deleteById(id: string): Promise<Users> {
    const deletedProfile = await this.usersModel.findByIdAndDelete(id);
    if (!deletedProfile) {
      throw new NotFoundException(`Profile to be deleted is not found`);
    }
    return deletedProfile;
  }
}
