import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';

describe('UsersController', () => {
  let controller;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [UsersController],
    }).compile();

    controller = module.get(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
