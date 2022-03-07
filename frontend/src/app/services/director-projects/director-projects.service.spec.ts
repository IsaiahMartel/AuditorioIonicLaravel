import { TestBed } from '@angular/core/testing';

import { DirectorProjectsService } from './director-projects.service';

describe('DirectorProjectsService', () => {
  let service: DirectorProjectsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DirectorProjectsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
