import { Test, TestingModule } from '@nestjs/testing';
import { ThemeSettingsController } from './theme-settings.controller';

describe('ThemeSettingsController', () => {
  let controller: ThemeSettingsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ThemeSettingsController],
    }).compile();

    controller = module.get<ThemeSettingsController>(ThemeSettingsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
