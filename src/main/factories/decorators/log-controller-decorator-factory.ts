import { Controller } from "../../../presentation/protocols";
import { LogMongoRepository } from "../../../infra/database/mongodb/log-repository/log-mongo-repository";
import { LogControllerDecorator } from "../../decorators/log/log-controller-decorator";

const makeLogControllerDecoratorFactory = (
  controller: Controller,
): Controller => {
  const logRepository = new LogMongoRepository();

  return new LogControllerDecorator(controller, logRepository);
};

export { makeLogControllerDecoratorFactory };
