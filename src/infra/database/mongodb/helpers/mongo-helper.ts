import { Collection, MongoClient } from "mongodb";

const MongoHelper = {
  client: null as MongoClient,
  url: null as string,
  async connect(uri: string) {
    this.url = uri;
    this.client = await MongoClient.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  },
  async disconnect() {
    await this.client.close();
    this.client = null;
  },
  async getCollection(name: string): Promise<Collection<any>> {
    if (!this.client?.isConnected()) {
      await this.connect(this.url);
    }

    return this.client.db().collection(name);
  },
  mapModelToId(data: any): any {
    if (!data) {
      return null;
    }

    const { _id, ...props } = data;

    return {
      id: _id,
      ...props,
    };
  },
  mapModelsToId(data: any[]): any[] {
    return data.map(this.mapModelToId);
  },
};

export { MongoHelper };
