import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SolicitarCuentaPage } from './solicitar-cuenta.page';

const routes: Routes = [
  {
    path: '',
    component: SolicitarCuentaPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [SolicitarCuentaPage]
})
export class SolicitarCuentaPageModule {}
