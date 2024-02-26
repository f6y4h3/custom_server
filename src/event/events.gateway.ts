import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Server } from 'ws';
import { message } from './type';
@WebSocketGateway(8080)
export class EventsGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('events')
  onEvent(client: any, data: any): Observable<WsResponse<number>> {
    console.log(data);
    client.send(JSON.stringify({ event: '111', data: 'ceshi' }));
    return from([1, 2, 3]).pipe(
      map((item) => ({ event: 'events', data: item })),
    );
  }

  @SubscribeMessage('message')
  onMessage(client: any, data: message) {
    // 群聊
    if (data.messageType == 1) {
      
    }else if(data.messageType == 2){
      
    }
    // 私聊
  }
}
