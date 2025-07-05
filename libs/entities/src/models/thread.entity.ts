import { Column, Entity } from 'typeorm';
import { EntityBase } from './entity.base';
import { SocialData } from './social-data.entity';

@Entity('threads')
export class Thread extends EntityBase {
  @Column({ name: 'external_id' })
  externalUuid: string;

  @Column({ name: 'url' })
  url: string;

  @Column({ name: 'site_full' })
  siteFull: string;

  @Column({ name: 'site' })
  site: string;

  @Column({ name: 'site_section' })
  siteSection: string;

  @Column({ name: 'site_categories', type: 'jsonb', default: [] })
  siteCategories: string[];

  @Column({ name: 'title' })
  title: string;

  @Column({ name: 'title_full' })
  titleFull: string;

  @Column({ name: 'published_at', type: 'timestamptz' })
  publishedAt?: Date;

  @Column({ name: 'replies_count', type: 'int', default: 0 })
  repliesCount: number;

  @Column({ name: 'participants_count', type: 'int', default: 0 })
  participantsCount: number;

  @Column({ name: 'site_type' })
  siteType: string;

  @Column({ name: 'country' })
  country: string;

  @Column({ name: 'main_image_url' })
  mainImageUrl: string;

  @Column({ name: 'performance_score', type: 'int', default: 0 })
  performanceScore: number;

  @Column({ name: 'domain_rank' })
  domainRank: number;

  @Column({
    name: 'domain_rank_updated_at',
    type: 'timestamptz',
  })
  domainRankUpdatedAt: Date;

  @Column({ name: 'social_data', type: 'jsonb', nullable: true })
  socialData: SocialData;
}
