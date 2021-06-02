import { Controller } from "@/presentation/protocols";
import { LogControllerDecorator } from "@/main/decorators/log/log-controller-decorator";
import { LogMongoRepository } from "@/infra/database/mongodb/log-repository/log-mongo-repository";

const makeLogControllerDecoratorFactory = (
  controller: Controller,
): Controller => {
  const logRepository = new LogMongoRepository();

  return new LogControllerDecorator(controller, logRepository);
};

export { makeLogControllerDecoratorFactory };
