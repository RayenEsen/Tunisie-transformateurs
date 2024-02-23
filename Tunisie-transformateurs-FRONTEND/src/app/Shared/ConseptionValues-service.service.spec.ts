/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ConseptionValuesServiceService } from './ConseptionValues-service.service';

describe('Service: ConseptionValuesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConseptionValuesServiceService]
    });
  });

  it('should ...', inject([ConseptionValuesServiceService], (service: ConseptionValuesServiceService) => {
    expect(service).toBeTruthy();
  }));
});
