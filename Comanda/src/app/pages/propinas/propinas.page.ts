import { Component, OnInit } from '@angular/core';
import { ZBar, ZBarOptions } from '@ionic-native/zbar/ngx';
import { NavController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-propinas',
  templateUrl: './propinas.page.html',
  styleUrls: ['./propinas.page.scss'],
})
export class PropinasPage implements OnInit {
    porcentajePropina:number;
  constructor(
      private zbar: ZBar, 
      public alertController: AlertController,
      public navCtrl: NavController) { }

  ngOnInit() {
    this.scanner();
  }
  private scanner() {
    let options: ZBarOptions = {
      flash: 'off',
      drawSight: false
    };
    this.zbar.scan(options)
      .then(result => {
          if(result == '0' || result  == '5' || result == '10' || result =='15' || result =='20') {
            this.porcentajePropina = result;
            this.presentAlert("Bien","porcentaje de propina" + this.porcentajePropina);
          }
          else
          {
            this.presentAlert('Error', 'El codigo qr no es valido');
          }
      })
      .catch(error => {
        this.presentAlert('Error', error.message);
      });
  }




  async presentAlert(headerMsj, msj) {
    const alert = await this.alertController.create({
      header: headerMsj,
      message: msj,
      buttons: [{
        text: 'Ok',
        handler: () => {
          this.navCtrl.navigateRoot('home');
          /*headerMsj === 'Error' 
            ? this.navCtrl.navigateRoot('home') 
              : console.log('ok');*/
        }
      }]
    });
    await alert.present();
    }


}
