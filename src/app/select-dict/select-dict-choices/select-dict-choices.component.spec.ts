import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectDictChoicesComponent } from './select-dict-choices.component';

describe('SelectDictChoicesComponent', () => {
  let component: SelectDictChoicesComponent;
  let fixture: ComponentFixture<SelectDictChoicesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectDictChoicesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectDictChoicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
