import { Type } from 'class-transformer';
import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';

export enum Environment {
  Development = 'development',
  Production = 'production',
}

export class ConfigSchema {
  @IsOptional()
  @IsEnum(Environment)
  NODE_ENV: Environment = Environment.Development;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  HOST: string = '0.0.0.0';

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  @Min(0)
  @Max(65535)
  PORT: number = 3000;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  SWAGGER_TITLE: string = 'Jadeite';

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  SWAGGER_DESCRIPTION: string = 'Jadeite API';

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  SWAGGER_VERSION: string = '1.0';

  @IsString()
  @IsNotEmpty()
  PINATA_API_KEY: string;

  @IsString()
  @IsNotEmpty()
  PINATA_SECRET_API_KEY: string;
}
