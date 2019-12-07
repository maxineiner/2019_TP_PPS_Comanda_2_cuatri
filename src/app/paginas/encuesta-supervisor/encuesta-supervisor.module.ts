import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { EncuestaSupervisorPage } from './encuesta-supervisor.page';

const routes: Routes = [
  {
    path: '',
    component: EncuestaSupervisorPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [EncuestaSupervisorPage]
})
export class EncuestaSupervisorPageModule {}
