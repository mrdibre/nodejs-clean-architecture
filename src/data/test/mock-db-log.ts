import { LogErrorRepository } from "@/data/protocols";

const mockLogErrorRepository = () => {
  class LogErrorRepositoryStub implements LogErrorRepository {
    async logError(stack: string): Promise<void> {
      return;
    }
  }

  return new LogErrorRepositoryStub();
};

export { mockLogErrorRepository };
