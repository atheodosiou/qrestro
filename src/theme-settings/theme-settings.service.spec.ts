import { Test, TestingModule } from '@nestjs/testing';
import { ThemeSettingsService } from './theme-settings.service';

describe('ThemeSettingsService', () => {
  let service: ThemeSettingsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ThemeSettingsService],
    }).compile();

    service = module.get<ThemeSettingsService>(ThemeSettingsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
