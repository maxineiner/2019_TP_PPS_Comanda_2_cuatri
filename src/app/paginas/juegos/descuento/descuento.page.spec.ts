import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DescuentoPage } from './descuento.page';

describe('DescuentoPage', () => {
  let component: DescuentoPage;
  let fixture: ComponentFixture<DescuentoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DescuentoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DescuentoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
