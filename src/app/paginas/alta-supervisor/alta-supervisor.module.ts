import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AltaSupervisorPage } from './alta-supervisor.page';

const routes: Routes = [
  {
    path: '',
    component: AltaSupervisorPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AltaSupervisorPage]
})
export class AltaSupervisorPageModule {}
