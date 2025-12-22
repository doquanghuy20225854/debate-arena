import { Test, TestingModule } from '@nestjs/testing';
import { VotesController } from './votes.controller';

describe('VotesController', () => {
  let controller;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [VotesController],
    }).compile();

    controller = module.get(VotesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
