import { Injectable } from '@nestjs/common';
import { PrismaCrudService } from 'nestjs-prisma-crud';
import { PrismaService } from '../prisma.service';

@Injectable()
export class <%= classify(name) %>Service extends PrismaCrudService {<% if (crud) { %>
  constructor(public prismaService: PrismaService) {
    super({
      model: '<%= lowercased(name) %>',
      prismaClient: prismaService,
      allowedJoins: [],
      defaultJoins: [],
    });
  }
<% } %>}
