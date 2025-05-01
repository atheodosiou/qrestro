import { IsNotEmpty, IsString } from 'class-validator';

export class CreateMenuSectionDto {
  @IsString()
  @IsNotEmpty()
  title: string;
}