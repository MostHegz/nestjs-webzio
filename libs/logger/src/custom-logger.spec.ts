import { Test, TestingModule } from '@nestjs/testing';
import { CustomLogger } from './custom-logger';

describe('CustomLogger', () => {
  let service: CustomLogger;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CustomLogger],
    }).compile();

    service = await module.resolve<CustomLogger>(CustomLogger);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
