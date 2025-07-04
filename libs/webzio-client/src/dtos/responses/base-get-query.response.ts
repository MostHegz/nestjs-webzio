export class BaseGetQueryResponse<TPost> {
  posts: TPost[];
  totalResults: number;
  moreResultsAvailable: number;
  requestsLeft: number;
  next: string;
}
