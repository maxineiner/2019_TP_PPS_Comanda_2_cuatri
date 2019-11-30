import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MozoAceptarPage } from './mozo-aceptar.page';

const routes: Routes = [
  {
    path: '',
    component: MozoAceptarPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MozoAceptarPage]
})
export class MozoAceptarPageModule {}
