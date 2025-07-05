import { Injectable } from '@nestjs/common';
import { WebzioNewsGetRequestBuilder } from '../builder/webzio-request.builder';
import { HttpService } from '@nestjs/axios';
import {
  BaseGetQueryResponse,
  FilterQueryParamDTO,
  WebzioGetNewsQueryResponseDto,
} from '../dtos';
import { WebzioNewsSortBy, WebzioOrder } from '../enums';
import { ConfigService } from '@nestjs/config';
import { CustomLogger } from '@app/logger';

@Injectable()
export class WebzioNewsClient {
  private readonly baseurl = 'https://api.webz.io';
  private readonly apiKey: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
    private readonly logger: CustomLogger,
  ) {
    this.apiKey = this.configService.getOrThrow<string>('WEBZIO_API_KEY');
    this.logger.setContext(WebzioNewsClient.name);
  }

  createBuilder(): WebzioNewsGetRequestBuilder {
    return new WebzioNewsGetRequestBuilder()
      .setEndpoint('newsApiLite')
      .setToken(this.apiKey);
  }

  async getAll(
    queryFilters: FilterQueryParamDTO[],
  ): Promise<BaseGetQueryResponse<WebzioGetNewsQueryResponseDto>> {
    this.logger.log(
      `Fetching news with filters: ${JSON.stringify(queryFilters)}`,
    );
    const posts: WebzioGetNewsQueryResponseDto[] = [];
    let response: BaseGetQueryResponse<WebzioGetNewsQueryResponseDto>;

    const requestBuilder = this.createBuilder()
      .setSortBy(WebzioNewsSortBy.RELEVANCY)
      .setOrder(WebzioOrder.ASCENDING);
    queryFilters.forEach((filter) => requestBuilder.addFilterQuery(filter));
    let nextQueryString = requestBuilder.build();

    let iterationCount = 0;
    do {
      iterationCount++;
      this.logger.log(
        `Fetching news, iteration: ${iterationCount}, query: ${nextQueryString}`,
      );
      response = await this.#get(nextQueryString);
      posts.push(...response.posts);
      nextQueryString = response.next;

      // I had to make this as  the condition as `moreResultsAvailable` kept returning the same number even when all results have returned
      // TODO: check with Webzio support if this is a bug
      // TODO: this will always call the API at an extra time to get an empty array
    } while (nextQueryString && response.posts.length > 0);

    return {
      ...response,
      posts: posts,
    };
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
