import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import {
  DecodedTokenDTO,
  ValidateUserDTO,
  ValidateUserReponseDTO,
} from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    payload: ValidateUserDTO,
  ): Promise<ValidateUserReponseDTO> {
    const { email, name } = payload;
    let user = await this.prisma.user.findFirst({
      where: { email },
    });

    if (!user) {
      user = await this.prisma.user.create({
        data: {
          email,
          name,
        },
      });
    }

    return user;
  }

  login(user: ValidateUserReponseDTO) {
    const payload = {
      sub: user.id,
      username: user.email,
    };
    return this.jwtService.sign(payload);
  }

  async getUserProfile(userId: string) {
    const profile = await this.prisma.user.findFirst({
      where: { id: userId },
      select: { id: true, email: true },
    });
    return profile;
  }

  decodeToken(token: string): DecodedTokenDTO {
    return this.jwtService.decode(token);
  }
}
