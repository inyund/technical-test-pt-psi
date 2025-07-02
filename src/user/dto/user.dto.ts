import { ApiProperty } from '@nestjs/swagger';
import { randomUUID } from 'crypto';

export class GetUserListResponseDTO {
  @ApiProperty({
    type: String,
    example: randomUUID(),
    description: 'The user id',
  })
  user_id: string;

  @ApiProperty({
    type: String,
    example: randomUUID(),
    description: 'The company id',
  })
  company_id: string;

  @ApiProperty({
    type: String,
    example: 'Juli',
    description: 'The user name',
  })
  nama: string;

  @ApiProperty({
    type: String,
    example: 'Sammny@mail.com',
    description: 'The user email',
    nullable: true,
  })
  email: string | null;

  @ApiProperty({
    type: String,
    example: '0987654321',
    description: 'The user phone',
    nullable: true,
  })
  telp: string | null;

  @ApiProperty({
    type: String,
    example: 'PIC',
    description: 'The company code',
    nullable: true,
  })
  company_code: string | null;

  @ApiProperty({
    type: String,
    example: 'Samudera',
    description: 'The company name',
    nullable: true,
  })
  company_name: string | null;
}
