/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { RapportServiceService } from './Rapport-service.service';

describe('Service: RapportService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RapportServiceService]
    });
  });

  it('should ...', inject([RapportServiceService], (service: RapportServiceService) => {
    expect(service).toBeTruthy();
  }));
});
