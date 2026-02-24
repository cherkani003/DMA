import {IsOptional,IsEnum,} from 'class-validator';
import { Gender, BloodType, DiabetesType } from '@prisma/client';
  
  export class EditUserDto {
    
    @IsOptional()
    age? : number;

    @IsEnum(Gender)
    @IsOptional()
    gender?: Gender;

    @IsEnum(BloodType)
    @IsOptional()
    bloodType?: BloodType;

    @IsOptional()
    weight?: number;

    @IsOptional()
    height?: number;

    @IsEnum(DiabetesType)
    @IsOptional()
    diabetesType?: DiabetesType;

    
  }




// gender Gender?
// bloodType BloodType?
// weight Int?
// height Int?
// diabetesType DiabetesType?
