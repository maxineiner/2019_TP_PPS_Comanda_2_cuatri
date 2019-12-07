import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeMozoPage } from './home-mozo.page';

describe('HomeMozoPage', () => {
  let component: HomeMozoPage;
  let fixture: ComponentFixture<HomeMozoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeMozoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeMozoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
