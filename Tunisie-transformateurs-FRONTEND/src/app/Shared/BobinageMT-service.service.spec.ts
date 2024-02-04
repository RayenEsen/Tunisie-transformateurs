/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { BobinageMTServiceService } from './BobinageMT-service.service';

describe('Service: BobinageMTService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BobinageMTServiceService]
    });
  });

  it('should ...', inject([BobinageMTServiceService], (service: BobinageMTServiceService) => {
    expect(service).toBeTruthy();
  }));
});
