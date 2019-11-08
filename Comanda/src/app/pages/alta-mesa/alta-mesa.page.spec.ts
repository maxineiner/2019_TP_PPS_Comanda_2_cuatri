import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AltaMesaPage } from './alta-mesa.page';

describe('AltaMesaPage', () => {
  let component: AltaMesaPage;
  let fixture: ComponentFixture<AltaMesaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AltaMesaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AltaMesaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
