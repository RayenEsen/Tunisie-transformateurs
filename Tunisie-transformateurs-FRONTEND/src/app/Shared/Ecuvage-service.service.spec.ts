/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { EcuvageServiceService } from './Ecuvage-service.service';

describe('Service: EcuvageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EcuvageServiceService]
    });
  });

  it('should ...', inject([EcuvageServiceService], (service: EcuvageServiceService) => {
    expect(service).toBeTruthy();
  }));
});
