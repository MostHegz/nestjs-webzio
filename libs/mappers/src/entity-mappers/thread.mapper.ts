import { Injectable } from '@nestjs/common';
import { ThreadDto } from '@app/webzio-client/dtos';
import { Thread } from '@app/entities';
import { SocialDataMapper } from './social-data.mapper';

@Injectable()
export class ThreadMapper {
  constructor(private readonly socialDataMapper: SocialDataMapper) {}

  mapFromClientDTO(dto: ThreadDto): Thread {
    const thread = new Thread();
    thread.externalUuid = dto.uuid;
    thread.url = dto.url;
    thread.siteFull = dto.site_full;
    thread.site = dto.site;
    thread.siteSection = dto.site_section;
    thread.siteCategories = dto.site_categories;
    thread.titleFull = dto.title_full;
    thread.title = dto.title;
    thread.publishedAt = dto.published;
    thread.repliesCount = dto.replies_count;
    thread.participantsCount = dto.participants_count;
    thread.siteType = dto.site_type;
    thread.country = dto.country;
    thread.mainImageUrl = dto.main_image;
    thread.performanceScore = dto.performance_score;
    thread.domainRank = dto.domain_rank;
    thread.domainRankUpdatedAt = dto.domain_rank_updated;
    thread.socialData = this.socialDataMapper.mapFromClientDTO(dto.social);
    return thread;
  }
}
