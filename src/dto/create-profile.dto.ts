import { Transform } from 'class-transformer';
import {
  IsString,
  IsArray,
  IsNumberString,
  IsDate,
  IsEmpty,
  IsOptional,
} from 'class-validator';
// import { Auth } from 'src/auth/schemas/auth.schema';
// import { Interests } from '../schema/interest.schema';
import { ObjectId } from 'mongoose';

export class CreateProfileDto {
  // @IsEmpty({
  //   message: 'No Token Provided',
  // })
  // readonly user: ObjectId;

  // @IsEmpty({
  //   message: 'No Token Provided',
  // })
  // email: string;

  @IsString()
  @IsOptional()
  name: string;

  @IsDate()
  @IsOptional()
  @Transform(({ value }) => new Date(value))
  birthday: Date;

  // zodiac: string;

  // horoscope: string;

  @IsNumberString()
  @IsOptional()
  height: number;

  @IsNumberString()
  @IsOptional()
  weight: number;

  // @IsArray()
  // interest: string[]
  @IsArray()
  @IsOptional()
  interest: string[];
}
