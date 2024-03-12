import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { administrationOnlyGuard } from './administration-only.guard';

describe('administrationOnlyGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => administrationOnlyGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
