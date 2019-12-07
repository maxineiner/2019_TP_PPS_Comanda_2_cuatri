import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { EncuestasClientesPage } from './encuestas-clientes.page';

const routes: Routes = [
  {
    path: '',
    component: EncuestasClientesPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [EncuestasClientesPage]
})
export class EncuestasClientesPageModule {}
