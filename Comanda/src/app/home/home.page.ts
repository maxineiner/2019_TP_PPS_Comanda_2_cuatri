import { Component, OnInit } from '@angular/core';
import { NavController, MenuController } from '@ionic/angular';
import { NgxPermissionsService } from 'ngx-permissions';
import { ComandaServiceService } from '../services/comanda-service.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  rolUser: { id: string; idAuth: any; tipo: any; }[];
  permiso: string;

  constructor(
    public navCtrl: NavController,
    private menu: MenuController,
    private permissionsService: NgxPermissionsService,
    private comandaService: ComandaServiceService,
    private authService: AuthService) {    
  }

  ngOnInit() {
    /*const perm = ["CLIENTE"];
    this.permissionsService.loadPermissions(perm);*/
    this.loadPermissions();
  }

  loadPermissions() {
    this.comandaService.getRol_user().subscribe(data => {
      this.rolUser = data.map(e => {
        return {
          id: e.payload.doc.id,
          idAuth: e.payload.doc.data()['idAuth'],
          tipo: e.payload.doc.data()['tipo'],
        };
      })
      const id = this.authService.currentUserId();
      const user = this.rolUser.find(user => user.idAuth === id );
      this.permiso = user.tipo;
      this.permissionsService.addPermission(this.permiso);
    });
  }

  add(typeEmployed) {
    this.navCtrl.navigateRoot(['alta', typeEmployed]);
  }

  pruebaprod() {
    this.navCtrl.navigateRoot('alta-productos');
  }

  irAListaEspera() {
    this.navCtrl.navigateRoot('lista-espera');  
  }

  encuestas(){
    console.log('encuestas');
  }

}
