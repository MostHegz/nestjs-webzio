import { Type } from 'class-transformer';
import { EntityDetailDto } from './entity-detail.dto';

export class EntitiesDto {
  @Type(() => EntityDetailDto)
  persons: EntityDetailDto[];

  @Type(() => EntityDetailDto)
  organizations: EntityDetailDto[];

  @Type(() => EntityDetailDto)
  locations: EntityDetailDto[];
}
