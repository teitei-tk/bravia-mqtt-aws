import { SubscribeProviderInterface } from "./provider";

export class Subscriber {
  client: SubscribeProviderInterface;

  constructor(client?: SubscribeProviderInterface | null) {
    this.client = client;
  }

  async subscribe() {
    const result = await this.client.connect();
    if (!result) {
      throw new Error("cannot connect subscibe client.");
    }
    const message = await this.client.message();
    console.log(message);
  }
}
