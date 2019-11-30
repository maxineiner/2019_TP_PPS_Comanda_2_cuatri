import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { HomeDeliveryPage } from './home-delivery.page';

const routes: Routes = [
  {
    path: '',
    component: HomeDeliveryPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [HomeDeliveryPage]
})
export class HomeDeliveryPageModule {}
