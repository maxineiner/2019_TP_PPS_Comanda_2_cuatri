import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { NgxPermissionsService } from 'ngx-permissions';
import { ComandaServiceService } from 'src/app/services/comanda-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email: string;
  password: string;
  rolUser: { id: string; idAuth: any; rol: any; }[];
  permiso: any;

  constructor(private authService: AuthService
    , private publicRouter: Router
    , public alertController: AlertController
    , private permissionsService: NgxPermissionsService
    , private comandaService: ComandaServiceService) { }

  ngOnInit() {
  }  

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Error',
      message: 'Por favor, reingrese.',
      buttons: ['OK']
    });
    await alert.present();
  }

  OnSubmitLogIn() {
    this.authService.logIn(this.email, this.password).then(res => {
      this.loadPermissions(res['user']['uid']);      
    }).catch(err => { console.log(err); this.presentAlert() });
  }

  autocompletar(email, password) {
    this.email = email;
    this.password = password;
  }
  
  GoToRegister() {
    this.publicRouter.navigate(['/register']);
  }

  loadPermissions(idUser) {    
    this.comandaService.getRolUser().subscribe(data => {
      this.rolUser = data.map(e => {
        return {
          id: e.payload.doc.id,
          idAuth: e.payload.doc.data()['idAuth'],
          rol: e.payload.doc.data()['rol'],
        };
      });
      const user = this.rolUser.find(user => user.idAuth === idUser);
      this.permiso = user.rol;
      sessionStorage.setItem('idUser', idUser);
      sessionStorage.setItem('permiso', this.permiso);
      this.publicRouter.navigate(['/home']);
    });
  }  

}
