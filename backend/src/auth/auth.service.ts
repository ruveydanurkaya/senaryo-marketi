import { Injectable, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import * as bcrypt from 'bcrypt';
import { UserRole } from '../entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private usersRepo: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async register(userData: any) {
    const hashedPassword = await bcrypt.hash(userData.password, 10);

    const user = this.usersRepo.create({ ...userData, password: hashedPassword });

    return this.usersRepo.save(user);
  }

  async login(userDto: any) {
    const user = await this.usersRepo.findOne({ where: { email: userDto.email } });

    if (!user || !(await bcrypt.compare(userDto.password, user.password))) {
      throw new UnauthorizedException('Giriş başarısız: E-posta veya şifre yanlış');
    }

    const payload = { sub: user.id, role: user.role };

    return {
      access_token: this.jwtService.sign(payload),
      role: user.role,
    };
  }
  async getAllUsers() {
  return this.usersRepo.find({
    order: { id: 'ASC' } // ID sırasına göre getir
  });
}
  async promoteToAdmin(userId: number) {
    const user = await this.usersRepo.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('Kullanıcı bulunamadı');
    }

    user.role = UserRole.ADMIN;
    return this.usersRepo.save(user);
  }
}