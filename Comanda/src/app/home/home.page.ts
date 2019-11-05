import { Component } from '@angular/core';
import { NavController, MenuController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(public navCtrl: NavController, private menu: MenuController) {}

  add(typeEmployed) {
    this.navCtrl.navigateRoot(['alta', typeEmployed]);
  }

  pruebaprod() {
    this.navCtrl.navigateRoot('alta-productos');
  }

}
