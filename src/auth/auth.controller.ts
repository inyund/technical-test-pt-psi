import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';

import { Request, Response } from 'express';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

interface CustomRequest extends Request {
  user: {
    userId: string;
    email: string;
    name: string;
  };
}

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('google')
  @UseGuards(AuthGuard('google'))
  googleLogin() {}

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleLoginCallback(@Req() req: CustomRequest, @Res() res: Response) {
    const user = await this.authService.validateUser(req.user);

    const token = this.authService.login(user);

    res.cookie('access_token', token, {
      httpOnly: true,
      maxAge: 3600000,
      sameSite: 'lax',
    });

    res.redirect('/api/auth/profile');
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  async getProfile(@Req() req: CustomRequest) {
    const { userId } = req.user;
    const user = await this.authService.getUserProfile(userId);

    const token: string = req.cookies.access_token;
    const decoded = this.authService.decodeToken(token);

    return {
      id: user?.id,
      username: user?.email,
      'exp_session/iat': `${decoded.exp_session}`,
    };
  }

  @Get('logout')
  logout(@Res() res: Response) {
    res.clearCookie('access_token');
    res.send({ message: 'Logged out successfully' });
  }
}
