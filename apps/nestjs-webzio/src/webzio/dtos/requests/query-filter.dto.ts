import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class QueryFilterDTO {
  @ApiProperty({
    description:
      'Key of the query filter, used to identify the filter condition.',
    example: 'title',
    type: String,
  })
  @IsNotEmpty()
  key: string;

  @ApiProperty({
    description: 'Value of the query filter, used to match against the key.',
    example: 'Web Development Awesome',
    type: String,
  })
  @IsNotEmpty()
  value: string;
}
