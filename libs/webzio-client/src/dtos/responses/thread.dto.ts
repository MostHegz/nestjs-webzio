import { Type } from 'class-transformer';
import { SocialDto } from './social.dto';

export class ThreadDto {
  uuid: string;
  url: string;
  site_full: string;
  site: string;
  site_section: string;
  site_categories: string[];
  section_title: string;
  title: string;
  title_full: string;

  @Type(() => Date)
  published: Date;

  replies_count: number;
  participants_count: number;
  site_type: string;
  country: string;
  main_image: string;
  performance_score: number;
  domain_rank: number;

  @Type(() => Date)
  domain_rank_updated: Date;

  @Type(() => SocialDto)
  social: SocialDto;
}
