import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { DetallePedidoModalPage } from './detalle-pedido-modal.page';

const routes: Routes = [
  {
    path: '',
    component: DetallePedidoModalPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [DetallePedidoModalPage]
})
export class DetallePedidoModalPageModule {}
