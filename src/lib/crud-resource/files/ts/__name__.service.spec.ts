import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma.service';
import { <%= classify(name) %>Service } from './<%= name %>.service';

describe('<%= classify(name) %>Service', () => {
  let service: <%= classify(name) %>Service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [<%= classify(name) %>Service, PrismaService],
    }).compile();

    service = module.get<<%= classify(name) %>Service>(<%= classify(name) %>Service);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
