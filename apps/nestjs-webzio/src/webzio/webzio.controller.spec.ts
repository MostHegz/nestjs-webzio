import { Test, TestingModule } from '@nestjs/testing';
import { WebzioController } from './webzio.controller';
import { createMock } from '@golevelup/ts-jest';

describe('WebzioController', () => {
  let controller: WebzioController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WebzioController],
    })
      .useMocker(createMock)
      .compile();

    controller = module.get<WebzioController>(WebzioController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
