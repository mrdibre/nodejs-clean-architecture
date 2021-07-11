import { Request, Response } from "express";
import { Controller, HttpRequest } from "@/presentation/protocols";

const adaptExpressRoute = (controller: Controller) => {
  return async ({ body, params, accountId }: Request, res: Response) => {
    const httpRequest: HttpRequest = { body, params, accountId };

    const httpResponse = await controller.handle(httpRequest);

    if ([200, 204].includes(httpResponse.statusCode)) {
      return res.status(httpResponse.statusCode).json(httpResponse.body);
    }

    return res.status(httpResponse.statusCode).json({
      error: httpResponse.body.message,
    });
  };
};

export { adaptExpressRoute };
