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

  correo : string ="";
  clave : string ="";
  select : string;

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
          this.mensaje("Error! El correo electronico tiene un formato incorrecto.")
          break;
        case "The password is invalid or the user does not have a password.":
          this.mensaje("Error! La contraseña es incorrecta");
          break;
        default:
          this.loginServi.traerUsuario(this.correo).subscribe(
            respuesta =>{
             console.log();
             switch (respuesta['0']['estado']) {
               case 'pendiente':
                 this.mensaje("Su cuenta aun sigue en estado pendiente, intente ingresar nuevamente en la brevedad.")
                 break;
               default:
                 break;
             }
            }
          );
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

  llenarInput(){
    switch (this.select) {
      case "admin":
        this.correo = "admin@admin.com";
        this.clave = "111111"
        break;
      case "invitado":
        this.correo = "invitado@invitado.com";
        this.clave = "222222"
        break;
      case "usuario":
        this.correo = "usuario@usuario.com";
        this.clave = "333333"
        break;
      case "tester":
        this.correo = "tester@tester.com";
        this.clave = "555555"
        break;
      case "anonimo":
        this.correo = "anonimo@anonimo.com";
        this.clave = "444444"
        break;
      default:
        break;
    }
  }
  ngOnInit() {}
}
