import { Transform } from 'class-transformer';
import {
  IsString,
  IsArray,
  IsNumberString,
  IsDate,
  IsOptional,
  IsNumber,
} from 'class-validator';

export class UpdatingDto {
  @IsString()
  @IsOptional()
  name: string;

  // @IsDate()
  // @Transform(({ value }) => new Date(value))
  @IsOptional()
  birthday: Date;

  @IsNumberString()
  // @IsNumber()
  @IsOptional()
  height: number;

  @IsNumberString()
  // @IsNumber()
  @IsOptional()
  weight: number;

  @IsArray()
  @IsOptional()
  @IsString({ each: true })
  interest: string[];
}
