import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ComandaServiceService } from 'src/app/services/comanda-service.service';
import { NavController, AlertController } from '@ionic/angular';
import { ZBar, ZBarOptions } from '@ionic-native/zbar/ngx';

@Component({
  selector: 'app-lista-espera',
  templateUrl: './lista-espera.page.html',
  styleUrls: ['./lista-espera.page.scss'],
})
export class ListaEsperaPage implements OnInit {

  constructor(
    private comandaService: ComandaServiceService,
    private authService: AuthService,
    public navCtrl: NavController,
    public alertController: AlertController,
    private zbar: ZBar) { }

  ngOnInit() {

    let options: ZBarOptions = {
      flash: 'off',
      drawSight: false
    }

    this.zbar.scan(options)
      .then(result => {
        if (result === 'Lista_de_espera') {
          this.comandaService.addListaEspera(this.authService.currentUserEmail(), this.authService.currentUserId());
          this.presentAlert('Aviso', 'En la brevedad se le asignara una mesa, muchas gracias!!!.');
        } else {
          this.presentAlert('Error', 'El codigo qr no es valido.');
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
          headerMsj === 'Error' ? this.navCtrl.navigateRoot('home') : console.log('ok');
        }
      }]
    });
    await alert.present();
  }

}
