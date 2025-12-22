import { Test, TestingModule } from '@nestjs/testing';
import { EventsGateway } from './events.gateway';

describe('EventsGateway', () => {
  let gateway;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [EventsGateway],
    }).compile();

    gateway = module.get(EventsGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
