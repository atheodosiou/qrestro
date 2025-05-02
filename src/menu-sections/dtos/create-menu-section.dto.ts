import { IsNotEmpty, IsObject, IsOptional, IsString } from 'class-validator';

export class CreateMenuSectionDto {
  @IsNotEmpty()
  @IsObject()
  title: Record<string, string>;

  @IsOptional()
  @IsString()
  defaultLanguage?: string;
}