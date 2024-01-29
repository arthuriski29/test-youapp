import {
  BadRequestException,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

//DTO'S
import { CreateProfileDto } from 'src/dto/create-profile.dto';
import { UpdateProfileDto } from 'src/dto/update-profile.dto';

//SCHEMAS
import { User } from 'src/schemas/user.schema';
import { Profiles } from 'src/schemas/profile.schema';
import { Interests } from 'src/schemas/interest.schema';

//COMPONENTS
import { getZodiacHoroscopes } from 'src/components/zodiac_horoscopes';
import { calculateAge } from 'src/components/age_count';

export class ProfileService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    @InjectModel(Profiles.name)
    private profileModel: Model<Profiles>,
    @InjectModel(Interests.name)
    private interestModel: Model<Interests>,
  ) {}
  async getProfile(id: string): Promise<any> {
    try {
      const user = await this.userModel.findById(id).exec();
      if (!user) {
        throw new NotFoundException(`Profile with id #${id} not found`);
      }

      const profile = await this.profileModel.findOne({ user: user?.id });

      let age: number;
      if (profile && profile.birthday) {
        age = calculateAge(profile.birthday);
      }

      const interest = await this.interestModel.find({
        user: { $in: [id] },
      });
      const arrayInterest = interest.map((document) => document.interest);
      const resultInterest = arrayInterest;

      let result;

      if (!profile) {
        result = {
          email: user.email,
          username: user.username,
          interests: resultInterest,
        };
        return result;
      }

      result = {
        email: user.email,
        username: user.username,
        name: profile.name,
        birthday: profile.birthday,
        age: age ? age : null,
        zodiac: profile.zodiac,
        horoscope: profile.horoscope,
        height: profile.height,
        weight: profile.weight,
        interests: resultInterest,
      };

      return result;
    } catch (error) {
      throw new BadRequestException('get Profile Failed');
    }
  }

  async createProfile(id: string, createProfileDto: CreateProfileDto) {
    try {
      const { name, birthday, height, weight } = createProfileDto;

      const check = await this.profileModel.find({ user: id });

      const user = await this.userModel.findById(id).exec();
      if (check.length !== 0) {
        throw new ConflictException(
          'profile has been created, try updateProfile',
        );
      }

      let zodiac: string;
      let horoscope: string;
      if (birthday) {
        const zodiacHor = getZodiacHoroscopes(new Date(birthday));
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

      const result = {
        name: profileData.name,
        birthday: profileData.birthday,
        zodiac: profileData.zodiac,
        horoscope: profileData.horoscope,
        height: profileData.height,
        weight: profileData.weight,
      };
      return result;
    } catch (error) {
      throw error;
    }
  }

  async updateProfile(id: string, updateProfileDto: UpdateProfileDto) {
    try {
      const updating = await this.profileModel
        .findOneAndUpdate({ user: id }, updateProfileDto, {
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
      return result;
    } catch (error) {
      throw new BadRequestException('Update Profile Failed');
    }
  }

  async updateInterest(id: string, interestDto: string[]) {
    try {
      const interest = interestDto;
      if (interest) {
        const tocheck = interest.map((value) => ({
          interest: value,
        }));

        // Step 1: Create new documents if they don't exist
        for (const item of tocheck) {
          await this.interestModel.updateOne(
            { interest: item.interest },
            { $addToSet: { user: id } },
            { upsert: true },
          );
        }

        // Step 2: Check if documents have the same interest with each of `tocheck`
        const sortedInterest = await this.interestModel.find({
          interest: { $in: tocheck.map((item) => item.interest) },
        });

        // Step 3 and 4: Update documents based on matching interests
        for (const item of sortedInterest) {
          const hasSameInterest = tocheck.some(
            (checkItem) => checkItem.interest === item.interest,
          );
          if (!hasSameInterest) {
            // Remove id from user array
            await this.interestModel.updateOne(
              { _id: item._id },
              { $pull: { user: id } },
            );
          }
        }

        // Step 5: Check for each object inside `sortedInterest` that has `user` not including `id`
        const sortedNoId = sortedInterest.filter(
          (item) => !item.user.includes(id),
        );

        // Step 6: Update documents in `sortedNoId` by adding `user` with element `id`
        for (const item of sortedNoId) {
          await this.interestModel.updateOne(
            { _id: item._id },
            { $addToSet: { user: id } },
          );
        }

        // Step 7: Create new documents if they don't exist (again, to make sure they have `user: [id]`)
        for (const item of tocheck) {
          await this.interestModel.updateOne(
            { interest: item.interest },
            { $addToSet: { user: id } },
            { upsert: true },
          );
        }

        // Step 8: Delete before but not match Current interest

        const interestBeforeNotSame = await this.interestModel.find({
          user: { $in: [id] },
          interest: { $nin: tocheck.map((item) => item.interest) },
        });

        for (const item of interestBeforeNotSame) {
          await this.interestModel.updateOne(
            { _id: item._id },
            { $pull: { user: id } },
          );
        }

        // Step 9: Delete documents where user is an empty array
        await this.interestModel.deleteMany({ user: [] });
      }

      const findInterest = await this.interestModel.find({ user: id });
      const arrayInterest = findInterest.map((document) => document.interest);
      const resultInterest = arrayInterest;

      const result = { interests: resultInterest };
      return result;
    } catch (error) {
      throw error;
    }
  }
}
