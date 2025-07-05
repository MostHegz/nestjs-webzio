import { ArrayNotEmpty, IsNumber, Max } from 'class-validator';
import { QueryFilterDTO } from './query-filter.dto';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class SyncNewsRequestDTO {
  @ApiProperty({
    isArray: true,
    type: QueryFilterDTO,
    description: 'Array of query filters to apply to the news request.',
  })
  @ArrayNotEmpty()
  @Type(() => QueryFilterDTO)
  queryFilters: QueryFilterDTO[];
}
