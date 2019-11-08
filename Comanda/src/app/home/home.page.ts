import { Component } from '@angular/core';
import { NavController, MenuController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(public navCtrl: NavController, private menu: MenuController) {}

  goTo(route, param){
    if(param)
      this.navCtrl.navigateRoot([route, param]);
    else
      this.navCtrl.navigateRoot(route);
  }
  listaEspera() {
    this.navCtrl.navigateRoot('lista-espera-registro');
  }
}
