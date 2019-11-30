import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HacerPedidoPage } from './hacer-pedido.page';

describe('HacerPedidoPage', () => {
  let component: HacerPedidoPage;
  let fixture: ComponentFixture<HacerPedidoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HacerPedidoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HacerPedidoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
