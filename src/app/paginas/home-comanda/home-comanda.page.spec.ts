import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComandaPage } from './home-comanda.page';

describe('HomeComandaPage', () => {
  let component: HomeComandaPage;
  let fixture: ComponentFixture<HomeComandaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeComandaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComandaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
