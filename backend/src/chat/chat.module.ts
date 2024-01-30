import { Module } from '@nestjs/common';
import { MessagesModule } from 'src/messages/messages.module';
// import { ChatGateway } from './chat.gateway';
// import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [MessagesModule], 
})
export class ChatModule {}
