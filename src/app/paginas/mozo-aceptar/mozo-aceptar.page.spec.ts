import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MozoAceptarPage } from './mozo-aceptar.page';

describe('MozoAceptarPage', () => {
  let component: MozoAceptarPage;
  let fixture: ComponentFixture<MozoAceptarPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MozoAceptarPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MozoAceptarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
