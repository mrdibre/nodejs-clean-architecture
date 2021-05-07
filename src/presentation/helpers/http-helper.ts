import { HttpResponse } from "../protocols";
import { ServerError } from "../errors";

const badRequest = (error: Error): HttpResponse => ({
  statusCode: 400,
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

export { ok, badRequest, serverError };
