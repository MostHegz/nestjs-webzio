import { Injectable } from '@nestjs/common';
import { WebzioGetNewsQueryResponseDto } from '@app/webzio-client';
import { PostEntity } from '@app/entities';
import { ThreadMapper } from './thread.mapper';

@Injectable()
export class PostMapper {
  constructor(private readonly threadMapper: ThreadMapper) {}

  mapFromClientDTO(dto: WebzioGetNewsQueryResponseDto): PostEntity {
    const post = new PostEntity();
    post.thread = this.threadMapper.mapFromClientDTO(dto.thread);
    post.externalUuid = dto.uuid;
    post.url = dto.url;
    post.ordInThread = dto.ord_in_thread;
    post.parentUrl = dto.parent_url || undefined;
    post.author = dto.author;
    post.publishedAt = dto.published;
    post.title = dto.title;
    post.text = dto.text;
    post.highlightText = dto.highlightText;
    post.highlightTitle = dto.highlightTitle;
    post.highlightThreadTitle = dto.highlightThreadTitle;
    post.language = dto.language;

    return post;
  }
}
