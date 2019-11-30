import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AceptarClientePage } from './aceptar-cliente.page';

const routes: Routes = [
  {
    path: '',
    component: AceptarClientePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AceptarClientePage]
})
export class AceptarClientePageModule {}
