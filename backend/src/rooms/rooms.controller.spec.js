import { Test, TestingModule } from '@nestjs/testing';
import { RoomsController } from './rooms.controller';

describe('RoomsController', () => {
  let controller;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [RoomsController],
    }).compile();

    controller = module.get(RoomsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
