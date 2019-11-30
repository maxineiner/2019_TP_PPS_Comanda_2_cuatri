import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BarCocinaPage } from './bar-cocina.page';

describe('BarCocinaPage', () => {
  let component: BarCocinaPage;
  let fixture: ComponentFixture<BarCocinaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BarCocinaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BarCocinaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
