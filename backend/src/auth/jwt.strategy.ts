//Güvenlik Görevlisi
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      // Token'ı gelen isteğin neresinden okuyacağını belirtiyoruz.
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),

      // Süresi dolmuş tokenları kabul etme (false).
      ignoreExpiration: false,

      // Token'ın şifresini çözerken kullanılacak anahtar. AuthModule ile AYNI
      secretOrKey: 'GIZLI_ANAHTAR_BURAYA',
    });
  }

  // Token geçerliyse bu fonksiyon çalışır.
  // 'payload': Token'ın şifresi çözüldüğünde içinden çıkan veri (userId, role vb.)
  async validate(payload: any) {
    // Buradan dönen obje, NestJS tarafından otomatik olarak 'request.user' içine eklenir.
    // Artık controller'larda "Kim istek attı?" sorusunun cevabı budur.
    return { userId: payload.sub, role: payload.role };
  }
}