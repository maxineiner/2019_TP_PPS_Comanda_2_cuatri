import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { LoginService } from '../../servicios/login.service';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  constructor(private loginServi : LoginService,
    private toastController: ToastController,
    private router : Router,
    public loadingController: LoadingController) { 
     
    }


  correo : string ="";
  clave : string ="";
  select : string;

  ionViewWillEnter()
  { 
    this.correo = "";
    this.clave = "";
  }

  async present() {
    return await this.loadingController.create({
      duration: 5000,
      spinner: "bubbles",
      message: 'Iniciando sesion...',
      translucent: true,
      cssClass: "spinner",
    }).then(a => {
      a.present();
    });
  }

  async dismiss() {
    return await this.loadingController.dismiss();
  }


  async iniciarSecion()
  {
    if(this.correo == "" || this.clave == "")
    {
      this.mensaje("Error! Por favor, complete todos los campos antes de iniciar sesion");
    }
    else{
      this.present();
      let respuesta = await this.loginServi.ingresar(this.correo,this.clave);

      switch (respuesta) {
        case "The email address is badly formatted.":
          this.dismiss();
          this.mensaje("Error! El correo electronico tiene un formato incorrecto.");
          break;
        case "The password is invalid or the user does not have a password.":
            this.dismiss();
          this.mensaje("Error! La contraseña es incorrecta");
          break;
        case "There is no user record corresponding to this identifier. The user may have been deleted.":
            this.dismiss();
            this.mensaje("Error! la cuenta con la que intenta ingresar no existe");
            break;
        default:
          this.loginServi.traerUsuario(this.correo).subscribe(
            respuesta =>{
              this.dismiss();
             switch (respuesta['0']['estado']) {
               case 'pendiente':
                 this.mensaje("Su cuenta aun sigue en estado pendiente, intente ingresar nuevamente en la brevedad.");
                 break;
               case 'aceptado':
                 this.router.navigate(["/menu-cliente"]);
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
