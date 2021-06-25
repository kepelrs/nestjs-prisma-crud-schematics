import {
  SchematicTestRunner,
  UnitTestTree,
} from '@angular-devkit/schematics/testing';
import * as path from 'path';
import { ResourceOptions } from './resource.schema';

describe('Resource Factory', () => {
  const runner: SchematicTestRunner = new SchematicTestRunner(
    '.',
    path.join(process.cwd(), 'src/collection.json'),
  );

  describe('[REST API]', () => {
    it('should generate appropriate files ', async () => {
      const options: ResourceOptions = {
        name: 'user',
      };
      const tree = await runner
        .runSchematicAsync('resource', options)
        .toPromise();
      const files = tree.files;
      expect(files).toEqual([
        '/user/user.controller.spec.ts',
        '/user/user.controller.ts',
        '/user/user.module.ts',
        '/user/user.service.spec.ts',
        '/user/user.service.ts',
        '/user/dto/create-user.dto.ts',
        '/user/dto/update-user.dto.ts',
        '/user/entities/user.entity.ts',
      ]);
    });
  });

  describe('[REST API]', () => {
    const options: ResourceOptions = {
      name: 'user',
      isSwaggerInstalled: true,
    };

    let tree: UnitTestTree;

    beforeAll(async () => {
      tree = await runner.runSchematicAsync('resource', options).toPromise();
    });

    it('should generate "UserController" class', () => {
      expect(tree.readContent('/user/user.controller.ts'))
        .toEqual(`import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const created = await this.userService.create(createUserDto);
    return created;
  }

  @Get()
  async findAll(@Query('crudQ') crudQ?: string) {
    const matches = await this.userService.findAll(crudQ);
    return matches;
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Query('crudQ') crudQ?: string) {
    const match = await this.userService.findOne(id, crudQ);
    return match;
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Query('crudQ') crudQ?: string,
  ) {
    const updated = await this.userService.update(id, updateUserDto, crudQ);
    return updated;
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Query('crudQ') crudQ?: string) {
    return this.userService.remove(id, crudQ);
  }
}
`);
    });

    it('should generate "UserService" class', () => {
      expect(tree.readContent('/user/user.service.ts'))
        .toEqual(`import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaCrudService } from 'nestjs-prisma-crud';
import { PrismaService } from '../prisma.service';

@Injectable()
export class UserService extends PrismaCrudService {
  constructor(public prismaService: PrismaService) {
    super({
      repo: prismaService.user,
      allowedJoins: [],
      defaultJoins: [],
    });
  }
}
`);
    });

    it('should generate "UserModule" class', () => {
      expect(tree.readContent('/user/user.module.ts'))
        .toEqual(`import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';

@Module({
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
`);
    });

    it('should generate "User" class', () => {
      expect(tree.readContent('/user/entities/user.entity.ts'))
        .toEqual(`export class User {}
`);
    });

    it('should generate "CreateUserDto" class', () => {
      expect(tree.readContent('/user/dto/create-user.dto.ts')).toEqual(
        `export class CreateUserDto {}
`,
      );
    });

    it('should generate "UpdateUserDto" class', () => {
      expect(tree.readContent('/user/dto/update-user.dto.ts'))
        .toEqual(`import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {}
`);
    });

    it('should generate "UserController" spec file', () => {
      expect(tree.readContent('/user/user.controller.spec.ts'))
        .toEqual(`import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';

describe('UserController', () => {
  let controller: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
`);
    });

    it('should generate "UserService" spec file', () => {
      expect(tree.readContent('/user/user.service.spec.ts'))
        .toEqual(`import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
`);
      });
    });
});
