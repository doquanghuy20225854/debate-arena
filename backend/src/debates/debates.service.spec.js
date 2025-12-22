import { Test, TestingModule } from '@nestjs/testing';
import { DebatesService } from './debates.service';

describe('DebatesService', () => {
  let service;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [DebatesService],
    }).compile();

    service = module.get(DebatesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
