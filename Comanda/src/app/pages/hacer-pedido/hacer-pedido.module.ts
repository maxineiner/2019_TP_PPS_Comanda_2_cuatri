import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { HacerPedidoPage } from './hacer-pedido.page';

const routes: Routes = [
  {
    path: '',
    component: HacerPedidoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [HacerPedidoPage]
})
export class HacerPedidoPageModule {}
