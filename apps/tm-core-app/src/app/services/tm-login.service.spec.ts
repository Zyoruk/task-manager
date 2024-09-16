import { TestBed } from '@angular/core/testing';

import { TmLoginService } from './tm-login.service';

describe('TmLoginService', () => {
  let service: TmLoginService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TmLoginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
