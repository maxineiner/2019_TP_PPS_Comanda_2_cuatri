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
  spinner : boolean;
  ionViewWillEnter()
  { 
    this.correo = "";
    this.clave = "";
  }

  async present() {
    return await this.loadingController.create({
      spinner: "bubbles",
      message: 'Iniciando sesion...',
      translucent: true,
      cssClass: "spinner",
    }).then(a => {
      a.present().then(
        () =>{ 
          if(!this.spinner)
          {
          this.loadingController.dismiss();
          }
        }
      );
    });
  }

  async dismiss() {
    this.spinner = false;
    //return await this.loadingController.dismiss();
  }


  async iniciarSecion()
  {
    if(this.correo == "" || this.clave == "")
    {
      this.mensaje("<h2>Error!</h2><h4>Por favor, complete todos los campos antes de iniciar sesion</h4>");
    }
    else{
      this.present();
      let respuesta = await this.loginServi.ingresar(this.correo,this.clave);
      switch (respuesta) {
        case "The email address is badly formatted.":
          await this.dismiss().then(
            () => this.mensaje("Error! El correo electronico tiene un formato incorrecto.")
          );
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
          let promesa = this.loginServi.traerUsuario(this.correo).subscribe(
            respuesta =>{
              try {
              this.dismiss();
              switch (respuesta['0']['tipo'])
              {
                case 'cliente':
                  switch (respuesta['0']['estado'])
                  {
                  case 'pendiente':
                    this.mensaje("<h4>Su cuenta aun sigue en estado pendiente, intente ingresar nuevamente en la brevedad.</h4>");
                    promesa.unsubscribe();
                    break;
                  case 'aceptado':
                    this.router.navigate(["/menu-cliente"]);
                    promesa.unsubscribe();
                    break;
                  }
                  break;
                case 'jefe':
                    this.router.navigate(["/menu-jefe"]);
                    promesa.unsubscribe();
                  break;
                case 'anonimo':
                    this.router.navigate(["/menu-jefe"]);
                    promesa.unsubscribe();
                  break;
                case 'empleado':
                    this.router.navigate(["/menu-jefe"]);
                    promesa.unsubscribe();
                  break;
              }
                
              } catch (error) {
                this.mensaje("Su cuenta a sido eliminada.");
              }
            }
          )
          break;
      }
    }

  }

  async mensaje(texto)
  {
    const toast = await this.toastController.create({
      message: texto,
      duration: 2500,
      position:"top",
      color : "light",
      buttons: [{
          text: 'x',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }]
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
