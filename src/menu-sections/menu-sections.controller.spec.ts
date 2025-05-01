import { Test, TestingModule } from '@nestjs/testing';
import { MenuSectionsController } from './menu-sections.controller';

describe('MenuSectionsController', () => {
  let controller: MenuSectionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MenuSectionsController],
    }).compile();

    controller = module.get<MenuSectionsController>(MenuSectionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
