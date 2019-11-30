import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ComandaServiceService } from 'src/app/services/comanda-service.service';
import { NavController, AlertController, ModalController } from '@ionic/angular';
import { ZBar, ZBarOptions } from '@ionic-native/zbar/ngx';
import { ListaEsperaMesaService } from 'src/app/services/lista-espera-mesa.service';
import { MesaService } from 'src/app/services/mesa.service';
import { Table } from 'src/app/model/table';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertModalPage } from 'src/app/modals/alert-modal/alert-modal.page';

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
  mesas = [1, 2, 3];
  sm: boolean;
  imagenCliente: any;
  tables: any[];

  constructor(
    private comandaService: ComandaServiceService,
    private authService: AuthService,
    public navCtrl: NavController,
    public alertController: AlertController,
    private zbar: ZBar,
    private listaEsperaService: ListaEsperaMesaService,
    private mesasService: MesaService,
    private route: ActivatedRoute,
    private modalController: ModalController,
    public router: Router) { }

  ngOnInit() {
    this.getListTable();
  }

  async getListTable() {
    this.mesasService.getTableAvailable().subscribe(tables => {
      this.tables = tables.map(item => {
        return {
          id: item.payload.doc.id,
          ...item.payload.doc.data()
        } as Table;
      }).map(table => table.number);
      this.scanner();
    })
  }

  private scanner() {
    let options: ZBarOptions = {
      flash: 'off',
      drawSight: false
    };
    this.zbar.scan(options)
      .then(result => {
        result === 'Lista_Espera_Mesa' ? this.verificarListaEspera()
          : this.tables.includes(result) ? this.verificarMesa(result)
            : this.presentModalCustom('Error', 'El codigo qr no es valido.');
      })
      .catch(error => {
        this.presentModalCustom('Error', error.message);
      });
  }

  async presentAlert(msj) {
    const alert = await this.alertController.create({
      header: 'Aviso',
      subHeader: 'Prueba',
      message: msj,
      buttons: ['OK']
    });

    await alert.present();
  }

  async verificarListaEspera() {
    let existe = await this.listaEsperaService.existeEnListaEspera(this.authService.currentUserId());
    let mesa = await this.mesasService.getTableByClient(this.authService.currentUserId());
    mesa.docs.length > 0 ? this.presentModalCustom('Info', 'Usted ya tiene una mesa asignada')
      : existe.docs.length === 0 ? this.addListaEspera()
        : this.presentModalCustom('Info', 'Usted ya se encuentra en la lista de espera, por favor aguarde un momento.');
  }

  private async addListaEspera() {
    let cliente = this.getClient();
    this.listaEsperaService.addListaEspera(this.authService.currentUserEmail(), this.authService.currentUserId(), this.imagenCliente);
    this.presentModalCustom('Info', 'Se agrego a la lista de espera, en unos minutos se le asignara una mesa.');
  } 

  async getClient() {
    try {
      let x = await this.listaEsperaService.getCliente(this.authService.currentUserId());
      this.imagenCliente = x.docs[0].data()['image'];
    } catch(err) {
      this.presentModalCustom('Error', err.message);
    }   
    
  }

  async verificarMesa(numeroMesa) {
    let mesa = await this.mesasService.getTableByClient(this.authService.currentUserId());
    if (mesa.docs.length === 0) {
      this.presentModalCustom('Error', 'Esta mesa no le pertenece, puede solicitar una leyando el qr de lista de espera');
    } else {
      let table = mesa.docs[0].data() as Table;
      mesa.docs.length === 1 && table.number === numeroMesa
        ? this.presentModalCustom('Info', 'La mesa se verifico corretamente, puede tomar asiento y realizar su pedido')
        : this.presentModalCustom('Error', 'Esta mesa no le pertenece');
    }
  }

  async presentModalCustom(header: string, message: string) {
    const modal = await this.modalController.create({
      component: AlertModalPage,
      cssClass: header === 'Error' ? 'my-custom-modal-css-error' : 'my-custom-modal-css',
      componentProps: {
        header: header,
        message: message,
        action: header == 'Error' ? 'error' : header == 'Info' ? 'info' : 'confirm',
      }
    });

    modal.onDidDismiss()
      .then((data) => {
        if (message === 'La mesa se verifico corretamente, puede tomar asiento y realizar su pedido')
          this.router.navigate(['hacer-pedido']);
        else
          this.router.navigate(['home']);
      });

    return await modal.present();
  }

  //crear otro modal para redirigir el caso al this.navCtrl.navigateRoot('hacer-pedido');

}
