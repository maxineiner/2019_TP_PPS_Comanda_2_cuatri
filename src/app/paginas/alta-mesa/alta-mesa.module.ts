import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AltaMesaPage } from './alta-mesa.page';

const routes: Routes = [
  {
    path: '',
    component: AltaMesaPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AltaMesaPage]
})
export class AltaMesaPageModule {}
