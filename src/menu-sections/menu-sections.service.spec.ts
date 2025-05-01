import { Test, TestingModule } from '@nestjs/testing';
import { MenuSectionsService } from './menu-sections.service';

describe('MenuSectionsService', () => {
  let service: MenuSectionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MenuSectionsService],
    }).compile();

    service = module.get<MenuSectionsService>(MenuSectionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
