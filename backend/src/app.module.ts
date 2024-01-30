import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
// import { ChatGateway } from './chat/chat.gateway';
import { ChatModule } from './chat/chat.module';
import { MessagesModule } from './messages/messages.module';

@Module({
  imports: [AuthModule, ChatModule, MessagesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
