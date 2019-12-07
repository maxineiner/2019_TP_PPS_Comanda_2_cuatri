import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeSupervisorPage } from './home-supervisor.page';

describe('HomeSupervisorPage', () => {
  let component: HomeSupervisorPage;
  let fixture: ComponentFixture<HomeSupervisorPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeSupervisorPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeSupervisorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
