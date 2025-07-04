import {
  BaseGetQueryResponse,
  WebzioGetNewsQueryResponseDto,
} from '../../src/dtos';
import { webzioGetNewsQueryResponseMock } from './webzio-get-news-query.response.mock';

export function baseGetQueryResponseMock(
  totalResults: number,
  postsSize: number,
): BaseGetQueryResponse<WebzioGetNewsQueryResponseDto> {
  const posts: WebzioGetNewsQueryResponseDto[] = [];

  for (let i = 0; i < postsSize; i++) {
    const post = webzioGetNewsQueryResponseMock();
    post.title = `Mocked Post Title ${i + 1}`;
    post.text = `This is the text of mocked post number ${i + 1}.`;
    post.published = new Date();
    post.uuid = `mock-uuid-${i + 1}`;
    post.url = `https://example.com/mock-post-${i + 1}`;
    posts.push(post);
  }
  return {
    posts,
    totalResults,
    // currently this is what returns from the api
    moreResultsAvailable: totalResults - postsSize,
    next: '/newsApiLite?token=ace462ee-f299-444c-974e-689c7e8cdeff&ts=1751379763514&q=title%3AWeb+Development&sort=relevancy&order=desc&from=10&ns=22.511053&ni=4a75ba02fabea63a0f82e3ecc338f4bce54053c8&highlight=true&size=10',
    requestsLeft: 943,
  };
}
