import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class EditMetricsDto {
    @IsOptional()
    @IsNotEmpty()
    bloodSugar?: number;

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    bloodPressure?: string;

    @IsOptional()
    a1cLevel?: number;

    @IsOptional()
    exerciseDuration?: number;

    @IsString()
    @IsOptional()
    exerciseType?: string;

    @IsOptional()
    waterIntake?: number;

    @IsOptional()
    protein?: number;

    @IsOptional()
    fat?: number;

    @IsOptional()
    fiber?: number;

    @IsString()
    @IsOptional()
    vitamins?: string;

    @IsString()
    @IsOptional()
    minerals?: string;


}