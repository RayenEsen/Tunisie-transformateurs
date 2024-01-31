/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { EtapeServiceService } from './Etape-service.service';

describe('Service: EtapeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EtapeServiceService]
    });
  });

  it('should ...', inject([EtapeServiceService], (service: EtapeServiceService) => {
    expect(service).toBeTruthy();
  }));
});
