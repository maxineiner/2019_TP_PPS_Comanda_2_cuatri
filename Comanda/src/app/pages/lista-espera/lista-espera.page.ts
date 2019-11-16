import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ComandaServiceService } from 'src/app/services/comanda-service.service';
import { NavController, AlertController } from '@ionic/angular';
import { ZBar, ZBarOptions } from '@ionic-native/zbar/ngx';
import { ListaEsperaMesaService } from 'src/app/services/lista-espera-mesa.service';
import { MesaService } from 'src/app/services/mesa.service';
import { Table } from 'src/app/model/table';
import { ActivatedRoute } from '@angular/router';

/** Este componente es el encargado de manejar la logica de agregar a un cliente a la lista de 
 * espera, y de verificar la mesa una vez asignada
 */

@Component({
  selector: 'app-lista-espera',
  templateUrl: './lista-espera.page.html',
  styleUrls: ['./lista-espera.page.scss'],
})
export class ListaEsperaPage implements OnInit {

  /**contiene los numeros de las mesas */
  mesas = ['1', '2', '3'];
  sm: boolean;

  constructor(
    private comandaService: ComandaServiceService,
    private authService: AuthService,
    public navCtrl: NavController,
    public alertController: AlertController,
    private zbar: ZBar,
    private listaEsperaService: ListaEsperaMesaService,
    private mesasService: MesaService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      if (params['tipo'])
        this.sm = JSON.parse(params['tipo']);
    });
    this.scanner();
  }

  private scanner() {
    let options: ZBarOptions = {
      flash: 'off',
      drawSight: false
    };
    this.zbar.scan(options)
      .then(result => {
        result === 'Lista_Espera_Mesa' && this.sm ? this.addListaEspera()
          : result === 'Lista_Espera_Mesa' && !this.sm ? this.presentAlert('Error', 'El codigo qr no es valido.')
            : this.mesas.includes(result) && this.sm ? this.presentAlert('Error', 'El codigo qr no es valido.')
              : this.mesas.includes(result) && !this.sm ? this.verificarMesa(result)
                : this.presentAlert('Error', 'El codigo qr no es valido.');
      })
      .catch(error => {
        this.presentAlert('Error', error.message);
      });
  }

  async addListaEspera() {
    let existe = await this.listaEsperaService.existeEnListaEspera(this.authService.currentUserId());
    existe.docs.length === 0
      ? this.add()
      : this.presentAlert('Info', 'Usted ya se encuentra en la lista de espera, por favor aguarde un momento.');
  }

  private add() {
    this.listaEsperaService.addListaEspera(this.authService.currentUserEmail(), this.authService.currentUserId());
    this.presentAlert('Info', 'Se agrego a la lista de espera, en unos minutos se le asignara una mesa.');
  }

  async verificarMesa(numeroMesa) {
    let mesa = await this.mesasService.getTableByClient(this.authService.currentUserId());
    if (mesa.docs.length === 0) {
      this.presentAlert('Error', 'Esta mesa no le pertenece');
    } else {
      let table = mesa.docs[0].data() as Table;
      mesa.docs.length === 1 && table.number === parseInt(numeroMesa)
        ? this.presentAlert('Info', 'La mesa se verifico corretamente, puede tomar asiento y realizar su pedido')
        : this.presentAlert('Error', 'Esta mesa no le pertenece');
    }
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
