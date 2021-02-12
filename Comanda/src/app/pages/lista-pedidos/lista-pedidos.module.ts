import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ListaPedidosPage } from './lista-pedidos.page';

import { FiltroPedidosPipe } from '../../pipes/filtro-pedidos.pipe';

const routes: Routes = [
  {
    path: '',
    component: ListaPedidosPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ListaPedidosPage, FiltroPedidosPipe]
})
export class ListaPedidosPageModule {}
