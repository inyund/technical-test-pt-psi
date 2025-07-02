import { Body, Controller, Post } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { CheckoutPayloadDTO, CheckoutResponseDTO } from './dto/ecommerce.dto';
import { EcommerceService } from './ecommerce.service';
import { CommonResponseDTO } from 'src/common/dto/common.dto';

@Controller('ecommerce')
export class EcommerceController {
  constructor(private service: EcommerceService) {}

  @ApiResponse({
    status: 200,
    description: 'Checkout success',
    type: CheckoutResponseDTO,
  })
  @Post('/checkout')
  checkout(
    @Body() payload: CheckoutPayloadDTO,
  ): CommonResponseDTO<CheckoutResponseDTO> {
    const data = this.service.checkout(payload);
    return {
      success: true,
      message: 'Checkout success',
      data,
    };
  }
}
