import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ListaEsperaMetrePage } from './lista-espera-metre.page';

const routes: Routes = [
  {
    path: '',
    component: ListaEsperaMetrePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ListaEsperaMetrePage]
})
export class ListaEsperaMetrePageModule {}
