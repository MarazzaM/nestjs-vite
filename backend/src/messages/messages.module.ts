import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesController } from './messages.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [MessagesController],
  providers: [MessagesService],
  imports: [PrismaModule],
  exports: [MessagesService], 
})
export class MessagesModule {}
