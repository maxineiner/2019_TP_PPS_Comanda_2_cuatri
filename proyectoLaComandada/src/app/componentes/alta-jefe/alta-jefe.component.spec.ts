import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AltaJefeComponent } from './alta-jefe.component';

describe('AltaJefeComponent', () => {
  let component: AltaJefeComponent;
  let fixture: ComponentFixture<AltaJefeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AltaJefeComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AltaJefeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
