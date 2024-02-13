/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ElectriqueServiceService } from './electrique-service.service';

describe('Service: ElectriqueService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ElectriqueServiceService]
    });
  });

  it('should ...', inject([ElectriqueServiceService], (service: ElectriqueServiceService) => {
    expect(service).toBeTruthy();
  }));
});
