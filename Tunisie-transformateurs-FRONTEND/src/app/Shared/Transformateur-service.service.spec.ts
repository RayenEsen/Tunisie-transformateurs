/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TransformateurServiceService } from './Transformateur-service.service';

describe('Service: TransformateurService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TransformateurServiceService]
    });
  });

  it('should ...', inject([TransformateurServiceService], (service: TransformateurServiceService) => {
    expect(service).toBeTruthy();
  }));
});
