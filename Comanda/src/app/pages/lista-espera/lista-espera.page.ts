import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ComandaServiceService } from 'src/app/services/comanda-service.service';
import { NavController, AlertController } from '@ionic/angular';
import { ZBar, ZBarOptions } from '@ionic-native/zbar/ngx';
import { ListaEsperaMesaService } from 'src/app/services/lista-espera-mesa.service';
import { MesaService } from 'src/app/services/mesa.service';

@Component({
  selector: 'app-lista-espera',
  templateUrl: './lista-espera.page.html',
  styleUrls: ['./lista-espera.page.scss'],
})
export class ListaEsperaPage implements OnInit {

  /**contiene los numeros de las mesas */
  mesas = ['1', '2', '3'];

  constructor(
    private comandaService: ComandaServiceService,
    private authService: AuthService,
    public navCtrl: NavController,
    public alertController: AlertController,
    private zbar: ZBar,
    private listaEsperaService: ListaEsperaMesaService,
    private mesasService: MesaService) { }

  ngOnInit() {

    let options: ZBarOptions = {
      flash: 'off',
      drawSight: false
    }

    this.zbar.scan(options)
      .then(result => {
        if (result === 'Lista_Espera') {
          this.existeEnListaEspera();     
        } else if (this.mesas.includes(result)) {
          /*verificar si es su mesa*/
          this.verificarMesa();
        } else {
          this.presentAlert('Error', 'El codigo qr no es valido.');
        }
      })
      .catch(error => {
        this.presentAlert('Error', error.message);
      });
  }

  async existeEnListaEspera() {
    let existe = await this.listaEsperaService.existeEnListaEspera(this.authService.currentUserId());
    if (existe.docs.length === 0) {
      this.comandaService.addListaEspera(this.authService.currentUserEmail(), this.authService.currentUserId());
      this.presentAlert('Info', 'Se agrego a la lista de espera, en unos minutos se le asignara una mesa.');
    } else {
      this.presentAlert('Info', 'Usted ya se encuentra en la lista de espera, por favor aguarde un momento.');
    }
  }

  async verificarMesa() {
    let mesa = await this.mesasService.getTableByClient(this.authService.currentUserId());
    if (mesa.docs.length === 1) {
      this.presentAlert('Info', 'La mesa se verifico corretamente, puede tomar asiento y realizar su pedido');
    } else {
      this.presentAlert('Error', 'Esta mesa no le pertenece');
    }
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
