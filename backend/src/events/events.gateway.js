import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';

@WebSocketGateway()
export class EventsGateway {
  @SubscribeMessage('message')
  handleMessage(client, payload) {
    return 'Hello world!';
  }
}
