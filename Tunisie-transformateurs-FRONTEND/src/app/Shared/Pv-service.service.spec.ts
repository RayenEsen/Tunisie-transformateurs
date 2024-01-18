/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PvServiceService } from './Pv-service.service';

describe('Service: PvService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PvServiceService]
    });
  });

  it('should ...', inject([PvServiceService], (service: PvServiceService) => {
    expect(service).toBeTruthy();
  }));
});
