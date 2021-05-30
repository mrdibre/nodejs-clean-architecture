import { HttpResponse } from "../../protocols";
import { ServerError, UnauthorizedError } from "../../errors";

const badRequest = (error: Error): HttpResponse => ({
  statusCode: 400,
  body: error,
});

const forbidden = (error: Error): HttpResponse => ({
  statusCode: 403,
  body: error,
});

const serverError = (error: Error): HttpResponse => ({
  statusCode: 500,
  body: new ServerError(error.stack),
});

const ok = (data: any): HttpResponse => ({
  statusCode: 200,
  body: data,
});

const noContent = (): HttpResponse => ({
  statusCode: 204,
  body: null,
});

const unauthorized = (): HttpResponse => ({
  statusCode: 401,
  body: new UnauthorizedError(),
});

export { ok, noContent, forbidden, badRequest, serverError, unauthorized };
