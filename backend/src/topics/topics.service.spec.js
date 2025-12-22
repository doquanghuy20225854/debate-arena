import { Test, TestingModule } from '@nestjs/testing';
import { TopicsService } from './topics.service';

describe('TopicsService', () => {
  let service;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [TopicsService],
    }).compile();

    service = module.get(TopicsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
