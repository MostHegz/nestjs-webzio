import { ApiProperty } from '@nestjs/swagger';

export class SyncNewResponseDto {
  @ApiProperty({
    type: Number,
    description: 'The count of newly added news items.',
  })
  count: number;
}
