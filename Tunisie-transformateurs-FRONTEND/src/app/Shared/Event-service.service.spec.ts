/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { EventServiceService } from './Event-service.service';

describe('Service: EventService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EventServiceService]
    });
  });

  it('should ...', inject([EventServiceService], (service: EventServiceService) => {
    expect(service).toBeTruthy();
  }));
});
