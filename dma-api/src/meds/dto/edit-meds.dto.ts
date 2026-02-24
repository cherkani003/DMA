import { IsNotEmpty, IsOptional, IsString, IsDateString } from 'class-validator';

export class EditMedsDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  dosage: string;

  @IsNotEmpty()
  @IsString()
  frequency: string;

  @IsOptional()
  @IsString()
  notes?: string;

  @IsDateString()
  @IsOptional()
  startDate?: string;

  @IsDateString()
  @IsOptional()
  endDate?: string;

  @IsNotEmpty()
  @IsString()
  foodTiming: string;

}
