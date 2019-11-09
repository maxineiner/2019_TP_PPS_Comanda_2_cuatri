import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ListaEsperaRegistroPage } from './lista-espera-registro.page';

const routes: Routes = [
  {
    path: '',
    component: ListaEsperaRegistroPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ListaEsperaRegistroPage]
})
export class ListaEsperaRegistroPageModule {}
