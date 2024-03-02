/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { EcuvageValuesServiceService } from './EcuvageValues-service.service';

describe('Service: EcuvageValuesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EcuvageValuesServiceService]
    });
  });

  it('should ...', inject([EcuvageValuesServiceService], (service: EcuvageValuesServiceService) => {
    expect(service).toBeTruthy();
  }));
});
