import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { User } from '../entities/user.entity';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    // Auth modülü içinde User tablosunu kullanacağımızı belirtiyoruz.
    TypeOrmModule.forFeature([User]),

    // Passport kütüphanesini (Authentication için standart) dahil ediyoruz.
    PassportModule,

    // JWT modülünü konfigüre ediyoruz.
    JwtModule.register({
      secret: 'GIZLI_ANAHTAR_BURAYA', // Token'ı şifrelerken kullanılan gizli anahtar. .env dosyasında olmalı!
      signOptions: { expiresIn: '60m' }, // Token 60 dakika sonra geçersiz olsun.
    }),
  ],
  // Bu modülde kullanılacak servisler ve stratejiler
  providers: [AuthService, JwtStrategy],

  // Dışarıdan erişilebilecek endpoint'ler (URL'ler)
  controllers: [AuthController],
})
export class AuthModule {}