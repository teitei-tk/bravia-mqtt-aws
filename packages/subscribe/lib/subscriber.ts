export interface QOS {
  qos: 0 | 1;
}

export interface SubscriberInterface {
  subscribe(subscribeName: string, options: QOS): Promise<{ result: boolean }>;
  connect(): Promise<{ result: boolean }>;
  message(): Promise<{ topic: string; payload: Buffer }>;
}

export class Subscriber {
  client: SubscriberInterface;

  constructor(client?: SubscriberInterface | null) {
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
