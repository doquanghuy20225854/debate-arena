import { Test, TestingModule } from '@nestjs/testing';
import { DebatesController } from './debates.controller';

describe('DebatesController', () => {
  let controller;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [DebatesController],
    }).compile();

    controller = module.get(DebatesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
