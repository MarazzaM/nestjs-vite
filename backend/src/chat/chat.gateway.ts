import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { MessagesService } from 'src/messages/messages.service';
import { CreateMessageDto } from 'src/messages/dto/create-message.dto';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ChatGateway {
  constructor(private readonly messagesService: MessagesService) {}

  @WebSocketServer() server: Server;

  @SubscribeMessage('message')
  async handleMessage(client: any, payload: CreateMessageDto): Promise<void> {
    console.log('Received message:', payload);
  
    // Save the message to the database using Prisma
    const savedMessage = await this.messagesService.create(payload);
  
    console.log('Saved message to database:', savedMessage);
  
    // Broadcast the saved message to all connected clients
    this.server.emit('message', savedMessage);
  }
  
}
