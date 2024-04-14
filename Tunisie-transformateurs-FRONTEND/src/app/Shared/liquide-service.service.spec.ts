/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { LiquideServiceService } from './liquide-service.service';

describe('Service: LiquideService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LiquideServiceService]
    });
  });

  it('should ...', inject([LiquideServiceService], (service: LiquideServiceService) => {
    expect(service).toBeTruthy();
  }));
});
