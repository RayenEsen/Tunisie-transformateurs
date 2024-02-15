/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { RemplissageServiceService } from './Remplissage-service.service';

describe('Service: RemplissageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RemplissageServiceService]
    });
  });

  it('should ...', inject([RemplissageServiceService], (service: RemplissageServiceService) => {
    expect(service).toBeTruthy();
  }));
});
