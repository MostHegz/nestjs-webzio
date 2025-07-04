import { Injectable } from '@nestjs/common';
import { WebzioNewsGetRequestBuilder } from '../builder/webzio-request.builder';
import { HttpService } from '@nestjs/axios';
import {
  BaseGetQueryResponse,
  FilterQueryParamDTO,
  WebzioGetNewsQueryResponseDto,
} from '../dtos';
import { WebzioNewsSortBy, WebzioOrder } from '../enums';
import { plainToInstance } from 'class-transformer';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class WebzioNewsClient {
  private readonly baseurl = 'https://api.webz.io';
  private readonly apiKey: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.apiKey = this.configService.getOrThrow<string>('WEBZIO_API_KEY');
  }

  createBuilder(): WebzioNewsGetRequestBuilder {
    return new WebzioNewsGetRequestBuilder()
      .setEndpoint('newsApiLite')
      .setToken(this.apiKey);
  }

  async getAll(
    queryFilters: FilterQueryParamDTO[],
  ): Promise<BaseGetQueryResponse<WebzioGetNewsQueryResponseDto>> {
    const posts: WebzioGetNewsQueryResponseDto[] = [];
    let response: BaseGetQueryResponse<WebzioGetNewsQueryResponseDto>;

    const requestBuilder = this.createBuilder()
      .setSortBy(WebzioNewsSortBy.RELEVANCY)
      .setOrder(WebzioOrder.ASCENDING);
    queryFilters.forEach((filter) => requestBuilder.addFilterQuery(filter));
    let nextQueryString = requestBuilder.build();

    do {
      response = await this.#get(nextQueryString);
      posts.push(...response.posts);
      nextQueryString = response.next;

      // I had to make this as  the condition as `moreResultsAvailable` kept returning the same number even when all results have returned
      // TODO: check with Webzio support if this is a bug
      // TODO: this will always call the API at an extra time to get an empty array
    } while (nextQueryString && response.posts.length > 0);

    const responseDTO = plainToInstance(
      BaseGetQueryResponse<WebzioGetNewsQueryResponseDto>,
      {
        ...response,
        posts: posts,
      },
    );
    return responseDTO;
  }

  async #get(
    queryString: string,
  ): Promise<BaseGetQueryResponse<WebzioGetNewsQueryResponseDto>> {
    const url = `${this.baseurl}${queryString}`;
    const response = await this.httpService.axiosRef.get<
      BaseGetQueryResponse<WebzioGetNewsQueryResponseDto>
    >(url, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  }
}
