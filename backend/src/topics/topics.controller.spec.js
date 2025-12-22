import { Test, TestingModule } from '@nestjs/testing';
import { TopicsController } from './topics.controller';

describe('TopicsController', () => {
  let controller;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [TopicsController],
    }).compile();

    controller = module.get(TopicsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
