<% if (crud && type === 'rest') { %>import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';<%
} else if (crud && type === 'microservice') { %>import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';<%
} else { %>import { Controller } from '@nestjs/common';<%
} %>
import { <%= classify(name) %>Service } from './<%= name %>.service';<% if (crud) { %>
import { Create<%= singular(classify(name)) %>Dto } from './dto/create-<%= singular(name) %>.dto';
import { Update<%= singular(classify(name)) %>Dto } from './dto/update-<%= singular(name) %>.dto';<% } %>

<% if (type === 'rest') { %>@Controller('<%= dasherize(name) %>')<% } else { %>@Controller()<% } %>
export class <%= classify(name) %>Controller {
  constructor(private readonly <%= lowercased(name) %>Service: <%= classify(name) %>Service) {}<% if (type === 'rest' && crud) { %>

  @Post()
  async create(@Body() create<%= singular(classify(name)) %>Dto: Create<%= singular(classify(name)) %>Dto, @Query('crudQuery') crudQuery: string) {
    const created = await this.<%= lowercased(name) %>Service.create(create<%= singular(classify(name)) %>Dto, { crudQuery });
    return created;
  }

  @Get()
  async findMany(@Query('crudQuery') crudQuery: string) {
    const matches = await this.<%= lowercased(name) %>Service.findMany({ crudQuery });
    return matches;
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Query('crudQuery') crudQuery: string) {
    const match = await this.<%= lowercased(name) %>Service.findOne(id, { crudQuery });
    return match;
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() update<%= singular(classify(name)) %>Dto: Update<%= singular(classify(name)) %>Dto,
    @Query('crudQuery') crudQuery: string,
  ) {
    const updated = await this.<%= lowercased(name) %>Service.update(id, update<%= singular(classify(name)) %>Dto, { crudQuery });
    return updated;
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Query('crudQuery') crudQuery: string) {
    return this.<%= lowercased(name) %>Service.remove(id, { crudQuery });
  }<% } %>
}
