import { BadRequestException } from '@nestjs/common';
import { WebzioNewsGetRequestBuilder } from './webzio-request.builder';

describe('WebzioNewsGetRequestBuilder', () => {
  it('should throw if token is not set', () => {
    const builder = new WebzioNewsGetRequestBuilder()
      .setEndpoint('newsApiLite')
      .addFilterQuery({ key: 'source', value: 'testSource' });
    expect(() => builder.build()).toThrow(BadRequestException);
  });

  it('should throw if endpoint is not set', () => {
    const builder = new WebzioNewsGetRequestBuilder()
      .setToken('test-token')
      .addFilterQuery({ key: 'source', value: 'testSource' });
    expect(() => builder.build()).toThrow(BadRequestException);
  });

  it('should throw if no filters were added', () => {
    const builder = new WebzioNewsGetRequestBuilder()
      .setToken('test-token')
      .setEndpoint('newsApiLite');
    expect(() => builder.build()).toThrow(BadRequestException);
  });

  it('should build a valid query string with filters', () => {
    const builder = new WebzioNewsGetRequestBuilder()
      .setToken('test-token')
      .setEndpoint('newsApiLite')
      .addFilterQuery({ key: 'source', value: 'testSource' });

    const queryString = builder.build();
    expect(queryString).toBe(
      '/newsApiLite?q=source%3AtestSource&token=test-token&sort=relevancy&order=asc&ts=undefined&from=undefined&format=json&size=10',
    );
  });
});
