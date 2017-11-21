import { TestBed, inject } from '@angular/core/testing';

import { SelectDictService } from './select-dict.service';

describe('SelectDictService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SelectDictService]
    });
  });

  it('should be created', inject([SelectDictService], (service: SelectDictService) => {
    expect(service).toBeTruthy();
  }));
});
