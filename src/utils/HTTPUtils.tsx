import { IHttpResponse } from './HTTP_Interfaces';

export async function http<T>(request: RequestInfo): Promise<IHttpResponse<T>> {
  const response: IHttpResponse<T> = await fetch(request);

  try {
    // may error if there is no body
    response.parsedBody = await response.json();
  } catch (ex) {}

  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response;
}

export async function get<T>(
  path: string,
  args: RequestInit = { method: 'get' },
): Promise<IHttpResponse<T>> {
  return await http<T>(new Request(path, args));
}

export async function post<T>(
  path: string,
  body: any,
  args: RequestInit = {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  },
): Promise<IHttpResponse<T>> {
  return await http<T>(new Request(path, args));
}

export async function put<T>(
  path: string,
  body: any,
  args: RequestInit = {
    method: 'put',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  },
): Promise<IHttpResponse<T>> {
  return await http<T>(new Request(path, args));
}

export async function http_delete<T>(
  path: string,
  body: any,
  args: RequestInit = { method: 'delete', body: JSON.stringify(body) },
): Promise<IHttpResponse<T>> {
  return await http<T>(new Request(path, args));
}
