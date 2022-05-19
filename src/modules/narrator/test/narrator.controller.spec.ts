import { Test, TestingModule } from '@nestjs/testing';
import { NarratorController } from '../controllers/narrator.controller';

describe('NarratorController', () => {
  let controller: NarratorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NarratorController],
    }).compile();

    controller = module.get<NarratorController>(NarratorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
