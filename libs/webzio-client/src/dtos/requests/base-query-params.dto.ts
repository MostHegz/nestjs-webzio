import { WebzioFormat, WebzioOrder, WebzioNewsSortBy } from '../../enums';

export class BaseQueryParamsDTO {
  q: string = '';
  token: string = '';
  sort: WebzioNewsSortBy = WebzioNewsSortBy.RELEVANCY;
  order: WebzioOrder = WebzioOrder.ASCENDING;
  ts?: number;
  from?: number;
  format: WebzioFormat = WebzioFormat.JSON;
  size: number = 10;
}
