/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { OperateurSuggestionsServiceService } from './OperateurSuggestions-service.service';

describe('Service: OperateurSuggestionsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OperateurSuggestionsServiceService]
    });
  });

  it('should ...', inject([OperateurSuggestionsServiceService], (service: OperateurSuggestionsServiceService) => {
    expect(service).toBeTruthy();
  }));
});
