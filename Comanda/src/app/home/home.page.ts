import { Component, OnInit } from '@angular/core';
import { NavController, MenuController } from '@ionic/angular';
import { NgxPermissionsService } from 'ngx-permissions';
import { ComandaServiceService } from '../services/comanda-service.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { ListaEsperaMesaService } from '../services/lista-espera-mesa.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  rolUser: { id: string; idAuth: any; rol: any; }[];
  permiso: string;
  
  constructor(
    public router: Router,
    public navCtrl: NavController,
    private menu: MenuController,
    private permissionsService: NgxPermissionsService,
    private comandaService: ComandaServiceService,
    private authService: AuthService,
    private listaEsperaService: ListaEsperaMesaService) {  
      console.log('constructor');  
  }

  ngOnInit() {    
    this.flushPermissions();
    this.loadPermissions();
  } 

  flushPermissions() {
    this.permissionsService.flushPermissions();
  }

  loadPermissions() {    
    this.comandaService.getRolUser().subscribe(data => {
      this.rolUser = data.map(e => {
        return {
          id: e.payload.doc.id,
          idAuth: e.payload.doc.data()['idAuth'],
          rol: e.payload.doc.data()['rol'],
        };
      });
      const id = sessionStorage.getItem('idUser');
      const user = this.rolUser.find(user => user.idAuth === id );
      this.permiso = user.rol;
      console.log('Permiso: ' + this.permiso);
      this.permissionsService.addPermission(this.permiso);
    });
  }
  
  goTo(route, param){
    if(param)
      //this.navCtrl.navigateRoot([route, param ]);
      this.router.navigate([route], { queryParams: {tipo: param}});
    else
      this.router.navigate([route]);
      // this.navCtrl.navigateRoot(route);
  }
  
  listaEspera() {
    this.router.navigate(['lista-espera-registro']);
    // this.navCtrl.navigateRoot('lista-espera-registro');
  }

  irAListaEspera() {
    this.router.navigate(['lista-espera']);
    // this.navCtrl.navigateRoot('lista-espera');  
  }



  encuestas(){
    console.log('encuestas');
  }  

}
