import * as events from "events";
import { Subscriber } from "../lib/subscriber";
import { SubscribeProviderInterface } from "../lib/provider";

const testTopicName = "topic/1";

class TestSubscriberClient implements SubscribeProviderInterface {
  subscribe(subscribeName, options): Promise<{ result: boolean }> {
    return Promise.resolve({ result: true });
  }

  connect(): Promise<{ result: boolean }> {
    return Promise.resolve({ result: true });
  }

  message(): Promise<{ topic: string; payload: Buffer }> {
    return Promise.resolve({
      topic: testTopicName,
      payload: new Buffer("1")
    });
  }
}

describe("@teitei-tk/bravia-subscriber", () => {
  describe("Subscriber", () => {
    let subscriber: Subscriber;
    beforeAll(() => {
      subscriber = new Subscriber(new TestSubscriberClient());
    });

    it("connect", async () => {
      const r = await subscriber.client.connect();
      expect(r).toBeTruthy();
    });

    it("message", async () => {
      const r = await subscriber.client.message();
      expect(r.topic).toBe(testTopicName);
      expect(r.payload.toString()).toBe("1");
    });
  });
});
