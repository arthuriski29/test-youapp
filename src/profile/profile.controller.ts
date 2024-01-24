import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CustomRequest } from 'src/interface/custom-request.interface';
import { CreateProfileDto } from 'src/dto/create-profile.dto';
import { UpdatingDto } from 'src/dto/update-profile.dto.dto';
import { JwtAuthGuard } from 'src/guard/jwt.guards';
import { ProfileService } from './profile.service';

@Controller('api')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get('/getProfile/')
  @UseGuards(JwtAuthGuard)
  async getProfile(@Req() req: CustomRequest): Promise<any> {
    const { id } = req.user;
    return await this.profileService.getProfile(id);
  }

  @Post('/createProfile')
  @UseGuards(JwtAuthGuard)
  async createProfile(
    @Req() req: CustomRequest,
    @Body() createProfileDto: CreateProfileDto,
  ): Promise<any> {
    const { id } = req.user;
    return await this.profileService.createProfile(id, createProfileDto);
  }

  @Put('/updateProfile')
  @UseGuards(JwtAuthGuard)
  async updateProfile(
    @Req() req: CustomRequest,
    @Body() updateProfileDto: UpdatingDto,
  ): Promise<any> {
    const { id } = req.user;
    const profile = await this.profileService.updateProfile(
      id,
      updateProfileDto,
    );
    const interest = await this.profileService.updateInterest(id, {
      interest: updateProfileDto.interest,
    });
    const result = {
      name: profile.name,
      birthday: profile.birthday,
      zodiac: profile.zodiac,
      horoscope: profile.horoscope,
      height: profile.height,
      weight: profile.weight,
      interests: interest.interest,
    };
    return result;
  }
}
