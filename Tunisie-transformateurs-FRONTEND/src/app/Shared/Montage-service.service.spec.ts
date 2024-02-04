/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MontageServiceService } from './Montage-service.service';

describe('Service: MontageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MontageServiceService]
    });
  });

  it('should ...', inject([MontageServiceService], (service: MontageServiceService) => {
    expect(service).toBeTruthy();
  }));
});
