import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email: string;
  password: string;

  constructor(private authService: AuthService
    , private publicRouter: Router
    , public alertController: AlertController) { }

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
      sessionStorage.setItem('idUser', res['user']['uid']);
      this.publicRouter.navigate(['/home']);
    }).catch(err => { console.log(err); this.presentAlert() });
  }

  autocompletar(email, password) {
    this.email = email;
    this.password = password;
  }
  
  GoToRegister() {
    this.publicRouter.navigate(['/register']);
  }

}
