/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { BobinageServiceService } from './Bobinage-service.service';

describe('Service: BobinageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BobinageServiceService]
    });
  });

  it('should ...', inject([BobinageServiceService], (service: BobinageServiceService) => {
    expect(service).toBeTruthy();
  }));
});
