import { Controller } from "../../../presentation/protocols";
import { LogMongoRepository } from "../../../infra/database/mongodb/log-repository/LogMongoRepository";
import { LogControllerDecorator } from "../../decorators/log/log-controller-decorator";

const makeLogControllerDecoratorFactory = (
  controller: Controller,
): Controller => {
  const logRepository = new LogMongoRepository();

  return new LogControllerDecorator(controller, logRepository);
};

export { makeLogControllerDecoratorFactory };
