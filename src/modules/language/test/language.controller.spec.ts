import { Test, TestingModule } from '@nestjs/testing';
import { LanguageController } from '../controllers/language.controller';

describe('LanguageController', () => {
  let controller: LanguageController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LanguageController],
    }).compile();

    controller = module.get<LanguageController>(LanguageController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
