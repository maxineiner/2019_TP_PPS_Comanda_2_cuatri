import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MesasModalPage } from './mesas-modal.page';

describe('MesasModalPage', () => {
  let component: MesasModalPage;
  let fixture: ComponentFixture<MesasModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MesasModalPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MesasModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
