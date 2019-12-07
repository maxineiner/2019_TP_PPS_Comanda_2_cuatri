import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeClientePage } from './home-cliente.page';

describe('HomeClientePage', () => {
  let component: HomeClientePage;
  let fixture: ComponentFixture<HomeClientePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeClientePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeClientePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
