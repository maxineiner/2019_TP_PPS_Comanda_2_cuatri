import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MozoTerminarPage } from './mozo-terminar.page';

describe('MozoTerminarPage', () => {
  let component: MozoTerminarPage;
  let fixture: ComponentFixture<MozoTerminarPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MozoTerminarPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MozoTerminarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
