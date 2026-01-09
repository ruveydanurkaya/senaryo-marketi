// Veri Kontrol Kapısı
import { IsString, IsNumber, IsArray, IsNotEmpty } from 'class-validator';

export class CreateScriptDto {
  @IsNotEmpty()

  @IsString()
  title: string;

  @IsString()
  content: string;

  @IsNumber()
  price: number;

  @IsArray()
  genreIds: number[];
}