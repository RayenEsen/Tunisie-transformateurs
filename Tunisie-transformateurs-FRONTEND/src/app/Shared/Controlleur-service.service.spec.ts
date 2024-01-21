/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ControlleurServiceService } from './Controlleur-service.service';

describe('Service: ControlleurService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ControlleurServiceService]
    });
  });

  it('should ...', inject([ControlleurServiceService], (service: ControlleurServiceService) => {
    expect(service).toBeTruthy();
  }));
});
