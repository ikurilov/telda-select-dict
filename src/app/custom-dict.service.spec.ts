import { TestBed, inject } from '@angular/core/testing';

import { CustomDictService } from './custom-dict.service';

describe('CustomDictService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CustomDictService]
    });
  });

  it('should be created', inject([CustomDictService], (service: CustomDictService) => {
    expect(service).toBeTruthy();
  }));
});
