import { Collection, MongoClient } from "mongodb";

const MongoHelper = {
  client: null as MongoClient,
  async connect(uri: string) {
    this.client = await MongoClient.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  },
  async disconnect() {
    await this?.client?.close();
  },
  async getCollection(name: string): Promise<Collection<any>> {
    return this.client.db().collection(name);
  },
};

export { MongoHelper };
