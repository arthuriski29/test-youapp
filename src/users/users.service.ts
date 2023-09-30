import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Users } from './schema/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersInterface } from './interface/users.interface.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Auth } from 'src/auth/schemas/auth.schema';
// import { ZodiacService } from 'src/users/dto/zodiac.dto';

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
    let zodiacTemp = '';
    let horoscopeTemp = '';
    const getZodiacHoroscopes = (birthdate: Date): any => {
      const month = birthdate.getMonth() + 1;
      const day = birthdate.getDate();

      if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) {
        zodiacTemp = 'Aries';
        horoscopeTemp = 'Rum';
        return {
          zodiacTemp,
          horoscopeTemp,
        };
      }
      if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) {
        zodiacTemp = 'Taurus';
        horoscopeTemp = 'Bull';
        return {
          zodiacTemp,
          horoscopeTemp,
        };
      }
      if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) {
        zodiacTemp = 'Gemini';
        horoscopeTemp = 'Twins';
        return {
          zodiacTemp,
          horoscopeTemp,
        };
      }
      if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) {
        zodiacTemp = 'Cancer';
        horoscopeTemp = 'Crab';
        return {
          zodiacTemp,
          horoscopeTemp,
        };
      }
      if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) {
        zodiacTemp = 'Leo';
        horoscopeTemp = 'Lion';
        return {
          zodiacTemp,
          horoscopeTemp,
        };
      }
      if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) {
        zodiacTemp = 'Virgo';
        horoscopeTemp = 'Virgin';
        return {
          zodiacTemp,
          horoscopeTemp,
        };
      }
      if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) {
        zodiacTemp = 'Libra';
        horoscopeTemp = 'Balance';
        return {
          zodiacTemp,
          horoscopeTemp,
        };
      }
      if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) {
        zodiacTemp = 'Scorpius';
        horoscopeTemp = 'Scorpion';
        return {
          zodiacTemp,
          horoscopeTemp,
        };
      }
      if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) {
        zodiacTemp = 'Sagittarius';
        horoscopeTemp = 'Archer';
        return {
          zodiacTemp,
          horoscopeTemp,
        };
      }
      if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) {
        zodiacTemp = 'Capricornus';
        horoscopeTemp = 'Goat';
        return {
          zodiacTemp,
          horoscopeTemp,
        };
      }
      if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) {
        zodiacTemp = 'Aquarius';
        horoscopeTemp = 'Water Bearer';
        return {
          zodiacTemp,
          horoscopeTemp,
        };
      }
      if ((month === 2 && day >= 19) || (month === 3 && day <= 20)) {
        zodiacTemp = 'Pisces';
        horoscopeTemp = 'Fish';
        return {
          zodiacTemp,
          horoscopeTemp,
        };
      }
    };
    const zodiacHorosocopes = getZodiacHoroscopes(new Date(data.birthday));
    const zodiac = zodiacHorosocopes.zodiacTemp;
    const horoscope = zodiacHorosocopes.horoscopeTemp;

    const newProfile = await this.usersModel.create({
      name: data.name,
      birthday: data.birthday,
      zodiac: zodiac,
      horoscope: horoscope,
      weight: data.weight,
      height: data.height,
      interest: data.interest,
    });
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
