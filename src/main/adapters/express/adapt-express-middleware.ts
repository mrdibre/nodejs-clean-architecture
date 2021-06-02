import { NextFunction, Request, Response } from "express";
import { HttpRequest } from "@/presentation/protocols";
import { Middleware } from "@/presentation/protocols/middleware";

const adaptExpressMiddleware = (middleware: Middleware) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const httpRequest: HttpRequest = { headers: req.headers };

    const httpResponse = await middleware.handle(httpRequest);

    if (httpResponse.statusCode === 200) {
      Object.assign(req, httpResponse.body);
      return next();
    }

    return res.status(httpResponse.statusCode).json({
      error: httpResponse.body.message,
    });
  };
};

export { adaptExpressMiddleware };
