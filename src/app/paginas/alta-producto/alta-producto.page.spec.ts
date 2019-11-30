import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AltaProductoPage } from './alta-producto.page';

describe('AltaProductoPage', () => {
  let component: AltaProductoPage;
  let fixture: ComponentFixture<AltaProductoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AltaProductoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AltaProductoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
