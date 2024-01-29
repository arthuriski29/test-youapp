import { IsString, IsArray, IsNumberString, IsOptional } from 'class-validator';

export class UpdateProfileDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsOptional()
  birthday: Date;

  @IsNumberString()
  @IsOptional()
  height: number;

  @IsNumberString()
  @IsOptional()
  weight: number;

  @IsArray()
  @IsOptional()
  @IsString({ each: true })
  interest: string[];
}
