import { IsOptional, IsString, MaxLength } from 'class-validator';

export class MovieCreateDto {
  @IsString()
  @MaxLength(50)
  title: string;

  @IsString()
  @MaxLength(50)
  director: string;
}

export class MovieUpdateDto {
  @IsString()
  @IsOptional()
  @MaxLength(50)
  title?: string;

  @IsString()
  @IsOptional()
  @MaxLength(50)
  director?: string;
}
