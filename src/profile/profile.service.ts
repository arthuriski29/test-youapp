import { BadRequestException, NotFoundException } from '@nestjs/common';
// import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { getZodiacHoroscopes } from 'src/components/zodiac_horoscopes';
import { CreateProfileDto } from 'src/dto/create-profile.dto';
import { UpdatingDto } from 'src/dto/updating.dto';
import { User } from 'src/schemas/user.schema';
import { Interests } from 'src/schemas/interest.schema';
import { Profiles } from 'src/schemas/profile.schema';

export class ProfileService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    @InjectModel(Profiles.name)
    private profileModel: Model<Profiles>,
    @InjectModel(Interests.name)
    private interestModel: Model<Interests>, // private jwtService: JwtService,
  ) {}
  async getProfile(id: string): Promise<any> {
    try {
      // const { email } = testDto;
      const user = await this.userModel.findById(id).exec();
      console.log(user);
      console.log(user.id);
      if (!user) {
        throw new NotFoundException(`Profile with id #${id} not found`);
      }

      const profile = await this.profileModel.findOne({ user: user?.id });
      console.log(profile);

      const interest = await this.interestModel.findOne({
        user: user?.id,
      });
      console.log(interest);

      let result;

      if (!profile) {
        result = {
          email: user.email,
          username: user.username,
          interests: interest === null ? [] : interest?.interest,
        };
        return result;
      }

      result = {
        email: user.email,
        username: user.username,
        name: profile.name,
        birthday: profile.birthday,
        zodiac: profile.zodiac,
        horoscope: profile.horoscope,
        height: profile.height,
        weight: profile.weight,
        interests: interest.interest,
      };

      return result;
    } catch (error) {
      throw new BadRequestException('get Profile Failed');
    }
  }

  async createProfile(id: string, createProfileDto: CreateProfileDto) {
    try {
      const { name, birthday, height, weight, interest } = createProfileDto;
      // console.log({
      //   id,
      //   name,
      //   birthday,
      //   height,
      //   weight,
      // });
      //email
      const user = await this.userModel.findById(id).exec();
      console.log(user);

      let zodiac: string;
      let horoscope: string;
      if (birthday) {
        const zodiacHor = getZodiacHoroscopes(new Date(birthday));
        console.log(zodiacHor);
        zodiac = zodiacHor.zodiacTemp;
        horoscope = zodiacHor.horoscopeTemp;
      }

      const profileData = await this.profileModel.create({
        user: user.id,
        name: name ? name : null,
        birthday: birthday ? birthday : null,
        zodiac: birthday ? zodiac : null,
        horoscope: birthday ? horoscope : null,
        height: height ? height : null,
        weight: weight ? weight : null,
      });
      profileData.save();

      const interestData = await this.interestModel.create({
        user: user.id,
        interest: interest ? interest : [null],
      });
      interestData.save();

      const result = {
        name: profileData.name,
        birthday: profileData.birthday,
        zodiac: profileData.zodiac,
        horoscope: profileData.horoscope,
        height: profileData.height,
        weight: profileData.weight,
        interests: interestData.interest,
      };
      return result;
    } catch (error) {
      throw new BadRequestException('Create Profile Failed');
    }
  }

  async updateProfile(id: string, updateProfileDto: UpdatingDto) {
    try {
      console.log('profile dto bfr', updateProfileDto);
      const userProfile = await this.profileModel.findOne({ user: id });
      console.log('usernya', userProfile);
      console.log('usernya profile', userProfile.user.toString());

      const updating = await this.profileModel
        .findOneAndUpdate({ user: userProfile.user }, updateProfileDto, {
          new: true,
          runValidators: true,
        })
        .exec();

      const zodiacHor = getZodiacHoroscopes(new Date(updating?.birthday));
      const zodiac = zodiacHor.zodiacTemp;
      const horoscope = zodiacHor.horoscopeTemp;

      const result = {
        name: updating.name,
        birthday: updating.birthday,
        zodiac: zodiac,
        horoscope: horoscope,
        height: updating.height,
        weight: updating.weight,
      };
      console.log('updating', result);
      return result;
    } catch (error) {
      throw new BadRequestException('Update Profile Failed');
    }
  }

  async updateInterest(id: string, interestDto: object) {
    try {
      const userInterest = await this.interestModel.findOne({ user: id });
      console.log('userInterest', userInterest);
      if (!userInterest) {
        throw new BadRequestException('user Interest not found');
      }
      const updating = await this.interestModel.findOneAndUpdate(
        { user: userInterest.user },
        // interestDto,
        interestDto,
        {
          new: true,
        },
      );
      if (!updating) {
        throw new BadRequestException('cannot update');
      }
      return updating;
    } catch (error) {
      throw new BadRequestException('Update Interest Failed');
    }
  }
}
