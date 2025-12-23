import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

// Bu controller 'http://localhost:3000/auth' adresini dinler.
@Controller('auth')
export class AuthController {
  // Service'i kullanabilmek için Constructor'da çağırıyoruz (Dependency Injection).
  constructor(private authService: AuthService) {}

  // POST İsteği: http://localhost:3000/auth/register
  @Post('register')
  register(@Body() body: any) {
    // Gelen veriyi (body) direkt servise gönderiyoruz.
    return this.authService.register(body);
  }

  // POST İsteği: http://localhost:3000/auth/login
  @Post('login')
  login(@Body() body: any) {
    // Giriş yapma isteğini servise iletiyoruz.
    return this.authService.login(body);
  }
}