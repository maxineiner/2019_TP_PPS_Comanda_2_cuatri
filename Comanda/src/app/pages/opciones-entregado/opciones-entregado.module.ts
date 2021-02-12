import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { OpcionesEntregadoPage } from './opciones-entregado.page';

const routes: Routes = [
  {
    path: '',
    component: OpcionesEntregadoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [OpcionesEntregadoPage]
})
export class OpcionesEntregadoPageModule {}
