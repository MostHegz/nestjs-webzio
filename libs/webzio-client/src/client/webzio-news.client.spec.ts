import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { Test } from '@nestjs/testing';
import { WebzioNewsClient } from './webzio-news.client';
import { createMock, DeepMocked } from '@golevelup/ts-jest';
import { AxiosInstance } from 'axios';
import { baseGetQueryResponseMock } from '../../test/mocks/base-get-query.response.mock';
import { BaseGetQueryResponse, WebzioGetNewsQueryResponseDto } from '../dtos';

describe('WebzioNewsClient', () => {
  let webzioNewsClient: WebzioNewsClient;
  let httpService: { axiosRef: DeepMocked<AxiosInstance> };

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        WebzioNewsClient,
        {
          provide: HttpService,
          useValue: {
            axiosRef: createMock<AxiosInstance>(),
          },
        },
        {
          provide: ConfigService,
          useValue: {
            getOrThrow: jest.fn().mockReturnValue('test-api-key'),
          },
        },
      ],
    }).compile();
    webzioNewsClient = module.get<WebzioNewsClient>(WebzioNewsClient);
    httpService = module.get<{ axiosRef: DeepMocked<AxiosInstance> }>(
      HttpService,
    );
  });

  describe('createBuilder', () => {
    it('should create a WebzioNewsGetRequestBuilder with the correct endpoint and token', () => {
      const builder = webzioNewsClient.createBuilder();
      expect(builder).toBeDefined();
      expect(builder['queryParams'].token).toBe('test-api-key');
      expect(builder['endpoint']).toBe('newsApiLite');
    });
  });

  describe('getAll', () => {
    it('should return a BaseGetQueryResponse with posts', async () => {
      const totalResults = 1123;
      const postsSize = 10;
      let remainingCount = totalResults; // Counter to track the number of posts added
      const queryFilters = [{ key: 'source', value: 'testSource' }];
      httpService.axiosRef.get.mockImplementation(() => {
        if (remainingCount <= 0) {
          return Promise.resolve({
            data: baseGetQueryResponseMock(totalResults, 0),
          });
        }
        const returnedPostCount = Math.min(remainingCount, postsSize);
        const mockResponse = baseGetQueryResponseMock(
          totalResults,
          returnedPostCount,
        );
        const result = Promise.resolve({
          data: { ...mockResponse },
        });
        remainingCount -= postsSize; // Decrement the counter by the size of posts
        return result;
      });

      const response = await webzioNewsClient.getAll(queryFilters);

      expect(response).toBeDefined();
      expect(response.posts.length).toBe(totalResults);
      expect(httpService.axiosRef.get).toHaveBeenCalledTimes(
        Math.ceil(totalResults / postsSize) + 1, // One extra call for the last batch that will have empty array
      );
      expect(response).toBeInstanceOf(
        BaseGetQueryResponse<WebzioGetNewsQueryResponseDto>,
      );
    });
  });
});
