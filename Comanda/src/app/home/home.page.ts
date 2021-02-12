import { Component, OnInit } from '@angular/core';
import { NavController, MenuController, ModalController } from '@ionic/angular';
import { NgxPermissionsService } from 'ngx-permissions';
import { ComandaServiceService } from '../services/comanda-service.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { ListaEsperaMesaService } from '../services/lista-espera-mesa.service';
import { NgxSpinnerService } from "ngx-spinner";
import { PedidosService } from '../services/pedidos.service';
import { Pedido } from '../model/pedido';
import { AlertModalPage } from '../modals/alert-modal/alert-modal.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  rolUser: { id: string; idAuth: any; rol: any; }[];
  permiso: string;
  ocultarBtn: boolean;

  constructor(
    public router: Router,
    public navCtrl: NavController,
    private menu: MenuController,
    private permissionsService: NgxPermissionsService,
    private comandaService: ComandaServiceService,
    private authService: AuthService,
    private listaEsperaService: ListaEsperaMesaService,
    private spinner: NgxSpinnerService,
    private pedidosService: PedidosService,
    private modalController: ModalController) {
  }

  ngOnInit() {
    //this.spinner.show()  
    this.flushPermissions();
    this.loadPermissions();
    this.verificarListaEspera();
  }

  ngOnDestroy() {
    console.log('ngOnDestroy');
  }

  flushPermissions() {
    this.permissionsService.flushPermissions();
  }

  loadPermissions() {
    this.permiso = sessionStorage.getItem('permiso');
    this.permissionsService.addPermission(this.permiso);
    /*this.comandaService.getRolUser().subscribe(data => {
      this.rolUser = data.map(e => {
        return {
          id: e.payload.doc.id,
          idAuth: e.payload.doc.data()['idAuth'],
          rol: e.payload.doc.data()['rol'],
        };
      });
      const id = sessionStorage.getItem('idUser');
      const user = this.rolUser.find(user => user.idAuth === id);
      this.permiso = user.rol;
      this.permissionsService.addPermission(this.permiso);
    });*/
  }

  goTo(route, param) {
    if (route === 'lista-espera') {
      this.verificarEstadopedido(route, param);
    }
  }

  async verificarEstadopedido(route, param) {
    const pedidoDoc = await this.pedidosService.getPedido(this.authService.currentUserId());
    if (pedidoDoc && pedidoDoc.docs && pedidoDoc.docs[0] && pedidoDoc.docs[0].data()) {
      const pedido: Pedido = pedidoDoc.docs[0].data() as Pedido;
      if (pedido.estado === 'ENTREGADO')
        this.router.navigate(['propina']);
      else
        if (param)
          this.router.navigate([route], { queryParams: { tipo: param } });
        else
          this.router.navigate([route]);
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

  listaEspera() {
    this.router.navigate(['lista-espera-registro']);
  }

  async verificarListaEspera() {
    let existe = await this.listaEsperaService.existeEnListaEspera(this.authService.currentUserId());
    existe.docs.length === 0 ? this.ocultarBtn = false : this.ocultarBtn = true;
  }

}
