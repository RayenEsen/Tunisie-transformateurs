/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ConseptionServiceService } from './Conseption-service.service';

describe('Service: ConseptionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConseptionServiceService]
    });
  });

  it('should ...', inject([ConseptionServiceService], (service: ConseptionServiceService) => {
    expect(service).toBeTruthy();
  }));
});
