import { ApiProperty } from '@nestjs/swagger';

export class CheckoutPayloadDTO {
  @ApiProperty({
    type: Number,
    required: true,
    example: 500000,
    description: 'The price of the product',
  })
  totalAmount: number;

  @ApiProperty({
    type: Boolean,
    required: true,
    example: true,
    description: 'Is user using discount coupon',
  })
  isUseCoupon: boolean;
}

export class CheckoutResponseDTO {
  @ApiProperty({
    type: Number,
    example: 250000,
    description: 'The discount amount',
  })
  discount: number;

  @ApiProperty({
    type: Number,
    example: 250000,
    description: 'The amount after discount',
  })
  totalAmount: number;

  @ApiProperty({
    type: Number,
    example: 50000,
    description: 'The point user get after discount',
  })
  point: number;
}
