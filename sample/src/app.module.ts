import { Module } from '@nestjs/common';
import { PrismaCrudModule } from 'nestjs-prisma-crud';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';

@Module({
  imports: [
    PrismaCrudModule.register({
      prismaService: PrismaService,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
