import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Server } from 'ws';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from '../auth/constants';
import { ConnectMap, MsgQueue } from './map';
import { message } from './type';
@WebSocketGateway(8080)
export class EventsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  private server: Server;
  constructor(private jwtService: JwtService) {}

  @SubscribeMessage('events')
  onEvent(client: Server, data: any): Observable<WsResponse<number>> {
    console.log(data, 1);
    client.send(JSON.stringify({ event: '111', data: 'ceshi' }));
    return from([1, 2, 3]).pipe(
      map((item) => ({ event: 'events', data: item })),
    );
  }

  @SubscribeMessage('message')
  async onMessage(client: Server, data: message) {
    const token = client['_protocol'];
    const userId = await this.getUserByToken(token);
    if (!ConnectMap.has(data.to)) {
      if(MsgQueue.has(data.to)) {
        MsgQueue.get(data.to).push({
          from: userId,
          to: data.to,
          message: data.message,
        });
      }else{
        MsgQueue.set(data.to, [
          {
            from: userId,
            to: data.to,
            message: data.message,
          },
        ]);
      }
      return;
    }
    ConnectMap.get(data.to).send(
      JSON.stringify({
        event: 'message',
        data: {
          from: userId,
          to: data.to,
          content: data.message,
        },
      }),
    );
  }
  async handleConnection(client: any) {
    const token = client['_protocol'];
    try {
      const userId = await this.getUserByToken(token);
      console.log(userId, '连接成功');     
      ConnectMap.set(userId, client);
      if (MsgQueue.has(userId)) {
        const msgList = this.getMsgList(userId);
        console.log('有缓存消息', msgList);
        for (const msg of msgList) {
          client.send(JSON.stringify({ event: 'message', data: msg }));
        }
      }
    } catch (e) {
      client.send(JSON.stringify({ event: 'loginout', data: token }));
    }
  }
  async handleDisconnect(client: any) {
    const token = client['_protocol'];
    const userId = await this.getUserByToken(token);
    if (ConnectMap.has(userId)) {
      ConnectMap.delete(userId);
    }
  }
  private async getUserByToken(token): Promise<number> {
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: jwtConstants.secret,
      });
      return payload['userId'];
    } catch (e) {
      return -1;
    }
  }
  private getMsgList(userId: number): message[] {
    const msgs: Array<message> = MsgQueue.get(userId);
    MsgQueue.delete(userId);
    return msgs;
  }
}
