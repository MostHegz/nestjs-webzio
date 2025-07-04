import { Type } from 'class-transformer';
import { EntitiesDto } from './entities.dto';
import { ThreadDto } from './thread.dto';

export class WebzioGetNewsQueryResponseDto {
  @Type(() => ThreadDto)
  thread: ThreadDto;

  uuid: string;
  url: string;
  ord_in_thread: number;
  parent_url: string | null;
  author: string;

  @Type(() => Date)
  published: Date;

  title: string;
  text: string;
  highlightText: string;
  highlightTitle: string;
  highlightThreadTitle: string;
  language: string;
  sentiment: string | null;
  categories: string[] | null;
  external_links: string[];
  external_images: string[];

  @Type(() => EntitiesDto)
  entities: EntitiesDto;

  rating: string | null;

  @Type(() => Date)
  crawled: Date;

  @Type(() => Date)
  updated: Date;
}
