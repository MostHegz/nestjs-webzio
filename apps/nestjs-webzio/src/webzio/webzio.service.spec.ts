import { Test, TestingModule } from '@nestjs/testing';
import { WebzioService } from './webzio.service';
import { createMock } from '@golevelup/ts-jest';

describe('WebzioService', () => {
  let service: WebzioService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WebzioService],
    })
      .useMocker(createMock)
      .compile();

    service = module.get<WebzioService>(WebzioService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
