import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectDictComponent } from './select-dict.component';

describe('SelectDictComponent', () => {
  let component: SelectDictComponent;
  let fixture: ComponentFixture<SelectDictComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectDictComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectDictComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
