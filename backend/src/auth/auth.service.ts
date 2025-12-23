import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    // User tablosuyla işlem yapabilmek için Repository'yi enjekte ediyoruz
    @InjectRepository(User) private usersRepo: Repository<User>,
    // JWT oluşturmak (sign) için JwtService'i enjekte ediyoruz
    private jwtService: JwtService,
  ) {}

  // --- KAYIT OLMA İŞLEMİ ---
  async register(userData: any) {
    // 1. Kullanıcının girdiği şifreyi (örn: "123456") veritabanında açık tutmamak için şifreliyoruz (Hashing).
    // '10' değeri salt rounds (karmaşıklık) seviyesidir.
    const hashedPassword = await bcrypt.hash(userData.password, 10);

    // 2. Yeni kullanıcı objesini oluşturuyoruz ama şifre kısmına hash'lenmiş halini koyuyoruz.
    const user = this.usersRepo.create({ ...userData, password: hashedPassword });

    // 3. Veritabanına kaydediyoruz.
    return this.usersRepo.save(user);
  }

  // --- GİRİŞ YAPMA İŞLEMİ ---
  async login(userDto: any) {
    // 1. E-posta adresine sahip kullanıcıyı veritabanında arıyoruz.
    const user = await this.usersRepo.findOne({ where: { email: userDto.email } });

    // 2. Kullanıcı yoksa VEYA şifreler eşleşmiyorsa hata fırlatıyoruz.
    // bcrypt.compare: Girilen şifre ile veritabanındaki hash'li şifreyi kıyaslar.
    if (!user || !(await bcrypt.compare(userDto.password, user.password))) {
      throw new UnauthorizedException('Giriş başarısız: E-posta veya şifre yanlış');
    }

    // 3. Şifre doğruysa, Token'ın içine gömeceğimiz bilgileri (payload) hazırlıyoruz.
    // 'sub': Subject (Genelde User ID olur), 'role': Kullanıcının yetkisi.
    const payload = { sub: user.id, role: user.role };

    // 4. Token'ı imzalayıp (sign) kullanıcıya geri dönüyoruz.
    return {
      access_token: this.jwtService.sign(payload),
      role: user.role, // Frontend'de yönlendirme yapmak için rolü de gönderiyoruz.
    };
  }
}