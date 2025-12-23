// Veri Kontrol Kapısı
import { IsString, IsNumber, IsArray, IsNotEmpty } from 'class-validator';

export class CreateScriptDto {
  @IsNotEmpty() //Başlık boş gönderilemez
  @IsString()
  title: string;

  @IsString()
  content: string; // Senaryonun özeti

  @IsNumber()
  price: number; // Fiyat

  @IsArray() // @IsArray: Birden fazla tür seçilebileceği için dizi (array) formatında ID'ler bekliyoruz.
  genreIds: number[];
}