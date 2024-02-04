/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MagnetiqueServiceService } from './Magnetique-service.service';

describe('Service: MagnetiqueService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MagnetiqueServiceService]
    });
  });

  it('should ...', inject([MagnetiqueServiceService], (service: MagnetiqueServiceService) => {
    expect(service).toBeTruthy();
  }));
});
