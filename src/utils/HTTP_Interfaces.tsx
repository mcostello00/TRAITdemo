export interface IHttpResponse<T> extends Response {
  parsedBody?: T;
}
