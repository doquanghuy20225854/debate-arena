import { Test, TestingModule } from '@nestjs/testing';
import { RoomsService } from './rooms.service';

describe('RoomsService', () => {
  let service;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [RoomsService],
    }).compile();

    service = module.get(RoomsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
