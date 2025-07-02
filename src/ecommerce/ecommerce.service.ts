import { Injectable } from '@nestjs/common';
import { CheckoutPayloadDTO, CheckoutResponseDTO } from './dto/ecommerce.dto';

@Injectable()
export class EcommerceService {
  checkout(payload: CheckoutPayloadDTO): CheckoutResponseDTO {
    const discount = payload.isUseCoupon ? payload.totalAmount * 0.5 : 0;
    const totalAmount = payload.totalAmount - discount;
    const point = discount * 0.2;
    return {
      discount,
      totalAmount,
      point,
    };
  }
}
