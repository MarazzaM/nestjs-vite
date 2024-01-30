import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MessagesService {
  constructor(private prisma: PrismaService) {}

  create(createMessageDto: CreateMessageDto) {
    return this.prisma.message.create({ data: createMessageDto });
  }


  findAll() {
    return this.prisma.message.findMany();
  }
  
  findAllUser(id: string) {
    return this.prisma.message.findMany({ where: { sender: id } });
  }

  findOne(id: number) {
    return this.prisma.message.findUnique({ where: { id } });
  }


}
