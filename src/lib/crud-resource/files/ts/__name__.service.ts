import { Injectable } from '@nestjs/common';
import { PrismaCrudService } from 'nestjs-prisma-crud';

@Injectable()
export class <%= classify(name) %>Service extends PrismaCrudService {<% if (crud) { %>
  constructor() {
    super({
      model: '<%= lowercased(name) %>',
      allowedJoins: [],
      defaultJoins: [],
    });
  }
<% } %>}
