import { TestBed, inject } from '@angular/core/testing';

import { NgModalService } from './ng-modal.service';

describe('NgModalService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NgModalService]
    });
  });

  it('should be created', inject([NgModalService], (service: NgModalService) => {
    expect(service).toBeTruthy();
  }));
});
