import { Body, Controller, Post, Get, Put, Param, UseGuards, Request, ForbiddenException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  register(@Body() body: any) {
    return this.authService.register(body);
  }

  @Post('login')
  login(@Body() body: any) {
    return this.authService.login(body);
  }
  @UseGuards(AuthGuard('jwt'))
  @Get('users')
  async getUsers(@Request() req) {
    if (req.user.role !== 'admin') {
      throw new ForbiddenException('Kullanıcı listesini sadece Admin görebilir!');
    }
    return this.authService.getAllUsers();
  }
  @UseGuards(AuthGuard('jwt'))
  @Put('promote/:id')
  async promoteUser(@Param('id') id: number, @Request() req) {

    if (req.user.role !== 'admin') {
      throw new ForbiddenException('Yetki verme işlemini sadece Admin yapabilir!');
    }

    return this.authService.promoteToAdmin(Number(id));
  }
}