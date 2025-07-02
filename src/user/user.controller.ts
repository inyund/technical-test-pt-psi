import { Controller, Get, Query } from '@nestjs/common';
import { CommonResponseDTO } from 'src/common/dto/common.dto';
import { UserService } from './user.service';
import {
  GetUserListResponseDTO,
  RandomUserQueryDTO,
  RandomUserResponseDTO,
} from './dto/user.dto';
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

  @ApiResponse({ status: 200, type: RandomUserResponseDTO })
  @Get('/random-user')
  async getRandomUser(
    @Query() queries: RandomUserQueryDTO,
  ): Promise<CommonResponseDTO<RandomUserResponseDTO[]>> {
    const data = await this.service.getRandomUser(queries);
    return {
      success: true,
      message: 'Success get random user',
      data,
    };
  }
}
