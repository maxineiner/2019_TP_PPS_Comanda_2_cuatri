import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { LoginService } from '../../servicios/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  constructor(private loginServi : LoginService,
    private toastController: ToastController,) { }

  correo ="";
  clave ="";

  async iniciarSecion()
  {
    if(this.correo == "" || this.clave == "")
    {
      this.mensaje("Error! Por favor, complete todos los campos antes de iniciar sesion");
    }
    else{
      let respuesta = await this.loginServi.ingresar(this.correo,this.clave);

      switch (respuesta) {
        case "The email address is badly formatted.":
          this.mensaje("Error!, el correo electronico tiene un formato incorrecto.")
          break;
        case "The password is invalid or the user does not have a password.":
          this.mensaje("Error!, la contraseña invalida");
          break;
        default:
          console.log(respuesta);
          this.mensaje(respuesta);
          break;
      }
    }

  }

  async mensaje(texto)
  {
    const toast = await this.toastController.create({
      message: texto,
      duration: 2500,
      color : "danger"
    });
    toast.present();
  }

  async test()
  {
    console.log("entre a test");
    this.loginServi.traerUsuario(this.correo);
  }

  ngOnInit() {}

}
