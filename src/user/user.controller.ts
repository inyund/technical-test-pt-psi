import { Controller, Get } from '@nestjs/common';
import { CommonResponseDTO } from 'src/common/dto/common.dto';
import { UserService } from './user.service';
import { GetUserListResponseDTO } from './dto/user.dto';
import { ApiResponse } from '@nestjs/swagger';

@Controller('user')
export class UserController {
  constructor(private service: UserService) {}
  @ApiResponse({ status: 200, type: GetUserListResponseDTO })
  @Get('/list')
  async getUsers(): Promise<CommonResponseDTO<GetUserListResponseDTO[]>> {
    const data = await this.service.getUsers();
    return {
      success: true,
      message: 'Success get user list',
      data,
    };
  }
}
