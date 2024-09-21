import { TestBed } from '@angular/core/testing';

import { TmAuthService } from './tm-auth.service';

describe('TmLoginService', () => {
  let service: TmAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TmAuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
