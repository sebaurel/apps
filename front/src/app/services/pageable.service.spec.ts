import { TestBed } from '@angular/core/testing';

import { PageableService } from './pageable.service';

describe('PageableService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PageableService = TestBed.get(PageableService);
    expect(service).toBeTruthy();
  });
});
