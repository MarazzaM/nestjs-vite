// src/articles/entities/article.entity.ts

import { Message } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class MessageEntity implements Message {
  @ApiProperty()
  id: number;

  @ApiProperty()
  content: string;

  @ApiProperty()
  sender: string;

  @ApiProperty()
  timestamp: Date;
}