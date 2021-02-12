import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertModalPage } from './alert-modal.page';

describe('AlertModalPage', () => {
  let component: AlertModalPage;
  let fixture: ComponentFixture<AlertModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlertModalPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
