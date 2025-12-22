import { Test, TestingModule } from '@nestjs/testing';
import { VotesService } from './votes.service';

describe('VotesService', () => {
  let service;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [VotesService],
    }).compile();

    service = module.get(VotesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
