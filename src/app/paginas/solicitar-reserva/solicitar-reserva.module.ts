import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SolicitarReservaPage } from './solicitar-reserva.page';

const routes: Routes = [
  {
    path: '',
    component: SolicitarReservaPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [SolicitarReservaPage]
})
export class SolicitarReservaPageModule {}
