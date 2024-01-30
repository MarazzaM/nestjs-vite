//src/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UsersModule } from 'src/users/users.module';
import { JwtStrategy } from './jwt.strategy';
import { ChatGateway } from 'src/chat/chat.gateway';
import { MessagesModule } from 'src/messages/messages.module';

export const jwtSecret = 'zjP9h6ZI5LoSKCRj';

@Module({
  imports: [
    PrismaModule,
    PassportModule,
    JwtModule.register({
      secret: jwtSecret,
      signOptions: { expiresIn: '30m' }, // e.g. 7d, 24h
    }),
    UsersModule,
    MessagesModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, ChatGateway],
})
export class AuthModule {}
