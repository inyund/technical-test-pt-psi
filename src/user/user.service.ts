import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { GetUserListResponseDTO } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}
  async getUsers(): Promise<GetUserListResponseDTO[]> {
    const users = await this.prismaService.user.findMany({
      include: {
        Company: true,
      },
    });

    return users.flatMap((user) =>
      user.Company.map((company) => ({
        user_id: user.id,
        company_id: company.id,
        nama: user.name,
        email: user.email,
        telp: user.phone,
        company_code: company.company_code,
        company_name: company.company_name,
      })),
    );
  }
}
