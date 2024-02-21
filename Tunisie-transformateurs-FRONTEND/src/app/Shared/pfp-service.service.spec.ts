/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PfpServiceService } from './pfp-service.service';

describe('Service: PfpService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PfpServiceService]
    });
  });

  it('should ...', inject([PfpServiceService], (service: PfpServiceService) => {
    expect(service).toBeTruthy();
  }));
});
