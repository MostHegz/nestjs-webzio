import { BadRequestException } from '@nestjs/common';
import { BaseQueryParamsDTO, FilterQueryParamDTO } from '../dtos';
import { WebzioNewsSortBy, WebzioOrder } from '../enums';

export class WebzioNewsGetRequestBuilder {
  private queryParams = new BaseQueryParamsDTO();
  private filterQuery: FilterQueryParamDTO[] = [];
  private endpoint: string = '';

  setToken(token: string): this {
    this.queryParams.token = token;
    return this;
  }

  setEndpoint(endpoint: string): this {
    this.endpoint = endpoint;
    return this;
  }

  setSortBy(sortBy: WebzioNewsSortBy): this {
    this.queryParams.sort = sortBy;
    return this;
  }

  setOrder(order: WebzioOrder): this {
    this.queryParams.order = order;
    return this;
  }

  setTimestamp(timestamp: number): this {
    this.queryParams.ts = timestamp;
    return this;
  }

  addFilterQuery(filter: FilterQueryParamDTO): this {
    this.filterQuery.push(filter);
    return this;
  }

  build(): string {
    this.#validate();
    this.queryParams.q = this.#buildFilterQuery();
    const queryString = Object.entries(this.queryParams)
      .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
      .join('&');

    return `/${this.endpoint}?${queryString}`;
  }

  #buildFilterQuery(): string {
    return this.filterQuery
      .map(
        (filter) =>
          `${filter.key as string}:${
            Array.isArray(filter.value) ? filter.value.join(',') : filter.value!
          }`,
      )
      .join(' ');
  }

  #validate(): void {
    if (!this.queryParams.token) {
      throw new BadRequestException('API token is required.');
    }

    if (!this.endpoint) {
      throw new BadRequestException('Endpoint is required.');
    }

    if (!this.filterQuery.length) {
      throw new BadRequestException('Filter query is required.');
    }
    // TODO: Add validation for queryParams.q
  }
}
