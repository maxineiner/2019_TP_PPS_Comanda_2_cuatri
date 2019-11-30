import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MozoTerminarPage } from './mozo-terminar.page';

const routes: Routes = [
  {
    path: '',
    component: MozoTerminarPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MozoTerminarPage]
})
export class MozoTerminarPageModule {}
