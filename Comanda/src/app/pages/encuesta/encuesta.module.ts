import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { EncuestaPage } from './encuesta.page';
import { ReactiveFormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';


const routes: Routes = [
  {
    path: '',
    component: EncuestaPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    ChartsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [EncuestaPage]
})
export class EncuestaPageModule {}
