import { Test, TestingModule } from '@nestjs/testing';
import { NarratorService } from '../services/narrator.service';

describe('NarratorService', () => {
  let service: NarratorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NarratorService],
    }).compile();

    service = module.get<NarratorService>(NarratorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
