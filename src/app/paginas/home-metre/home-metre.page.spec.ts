import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeMetrePage } from './home-metre.page';

describe('HomeMetrePage', () => {
  let component: HomeMetrePage;
  let fixture: ComponentFixture<HomeMetrePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeMetrePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeMetrePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
