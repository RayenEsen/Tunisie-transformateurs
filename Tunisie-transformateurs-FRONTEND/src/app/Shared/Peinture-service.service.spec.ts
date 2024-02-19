/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PeintureServiceService } from './Peinture-service.service';

describe('Service: PeintureService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PeintureServiceService]
    });
  });

  it('should ...', inject([PeintureServiceService], (service: PeintureServiceService) => {
    expect(service).toBeTruthy();
  }));
});
