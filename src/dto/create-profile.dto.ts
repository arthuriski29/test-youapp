import { Transform } from 'class-transformer';
import {
  IsString,
  IsArray,
  IsNumberString,
  IsDate,
  IsOptional,
} from 'class-validator';

export class CreateProfileDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsDate()
  @IsOptional()
  @Transform(({ value }) => new Date(value))
  birthday: Date;

  @IsNumberString()
  @IsOptional()
  height: number;

  @IsNumberString()
  @IsOptional()
  weight: number;

  @IsArray()
  @IsOptional()
  interest: string[];
}
