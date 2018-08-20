export interface QOS {
  qos: 0 | 1;
}

export interface SubscribeProviderInterface {
  subscribe(subscribeName: string, options: QOS): Promise<{ result: boolean }>;
  connect(): Promise<{ result: boolean }>;
  message(): Promise<{ topic: string; payload: Buffer }>;
}
