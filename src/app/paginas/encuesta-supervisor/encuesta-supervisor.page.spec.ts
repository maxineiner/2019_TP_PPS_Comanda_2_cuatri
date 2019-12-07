import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EncuestaSupervisorPage } from './encuesta-supervisor.page';

describe('EncuestaSupervisorPage', () => {
  let component: EncuestaSupervisorPage;
  let fixture: ComponentFixture<EncuestaSupervisorPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EncuestaSupervisorPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EncuestaSupervisorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
