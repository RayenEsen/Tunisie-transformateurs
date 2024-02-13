/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { Partie2ServiceService } from './Partie2-service.service';

describe('Service: Partie2Service', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Partie2ServiceService]
    });
  });

  it('should ...', inject([Partie2ServiceService], (service: Partie2ServiceService) => {
    expect(service).toBeTruthy();
  }));
});
