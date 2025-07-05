import { Injectable } from '@nestjs/common';
import { WebzioNewsClient } from '@app/webzio-client/client/webzio-news.client';
import { GetNewsRequestDTO, SyncNewResponseDto } from './dtos';
import { PostMapper } from '@app/mappers/entity-mappers';
import { PostRepository } from '@app/repositories';

@Injectable()
export class WebzioService {
  constructor(
    private readonly webzioNewsClient: WebzioNewsClient,
    private readonly postMappers: PostMapper,
    private readonly postRepository: PostRepository,
  ) {}

  async syncNews(dto: GetNewsRequestDTO): Promise<SyncNewResponseDto> {
    const data = await this.webzioNewsClient.getAll(dto.queryFilters);
    const entities = data.posts.map((post) =>
      this.postMappers.mapFromClientDTO(post),
    );

    await this.postRepository.save(entities);
    const response = new SyncNewResponseDto();
    response.count = data.posts.length;
    return response;
  }
}
