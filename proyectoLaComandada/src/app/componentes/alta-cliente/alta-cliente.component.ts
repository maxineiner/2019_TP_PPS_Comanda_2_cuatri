import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { ToastController, LoadingController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import{ AltaClienteService } from '../../servicios/alta-cliente.service';


@Component({
  selector: 'app-alta-cliente',
  templateUrl: './alta-cliente.component.html',
  styleUrls: ['./alta-cliente.component.scss'],
})
export class AltaClienteComponent implements OnInit {

  constructor(
    private camera: Camera,
    private altaCliente : AltaClienteService,
    private barcodeScanner : BarcodeScanner,
    private toastController: ToastController,
    public alertController: AlertController ,
    public router : Router,
    public loadingController: LoadingController
    ) { }

  ngOnInit() {}

  //atributos
  cliente = {
    nombre : "" ,
    apellido : "" ,
    dni : "" ,
    perfil : "cliente" ,
    correo : "" ,
    clave : "",
    foto:"../../assets/usos/user.png",
    estado:"pendiente"
  }

  options : CameraOptions = {
    quality: 40,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
    correctOrientation: true
  }



  //funciones

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

  tomarFoto()
  {
    this.camera.getPicture(this.options).then((imageData) => {
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      this.cliente.foto = base64Image;
    }, (err) => {
      // Handle error
    });
  }

  cargarPorQR()
  {
    this.barcodeScanner.scan({formats : "PDF_417"}).then(barcodeData => {
     
      let datosBarcode = barcodeData.text.split("@");
       console.log('Barcode data', datosBarcode);
       this.cliente.nombre = datosBarcode[2];
       this.cliente.apellido = datosBarcode[1];
       this.cliente.dni = datosBarcode[4];
     }).catch(err => {
         console.log('Error', err);
     });
  }

  async registrar()
  {
    if(this.cliente.perfil == "cliente")
    {
      if(this.cliente.apellido == "" || this.cliente.nombre == "" ||this.cliente.dni == "" || this.cliente.correo == "" || this.cliente.clave == "" )
      {
        const toast = await this.toastController.create({
          message: "Error! Por favor, complete todos los campos antes de registrarse",
          duration: 2500,
          color : "danger"
        });
        toast.present();
      }
      else{
        this.present();
         await this.altaCliente.AltaCliente(this.cliente);
         this.dismiss();
         const alert = await this.alertController.create({
          message: '<h1>¡Solicitud de cuenta enviada con exito!</h1>No podras iniciar sesion hasta que nuestros administradores acepten tu solicitud de cliente',
          cssClass: 'custom-alert-danger',
          buttons: [
            {
              text: '¡Exelente! volver al inicio',
              handler: () => {
                this.router.navigate(['/']);
              }
            }]
        }); 
        await alert.present();
      }
    }
    else{
      if(this.cliente.nombre == "" || this.cliente.correo == "" || this.cliente.clave == "")
      {
       
        const toast = await this.toastController.create({
          message: "Error! Por favor, complete todos los campos antes de registrarse",
          duration: 2500,
          color : "danger"
        });
        toast.present();
      }
      else{ 
        this.present();
        this.cliente.apellido = "";
        this.cliente.dni = "";
        this.cliente.foto = "../../assets/usos/user.png";
        this.cliente.estado = "aceptado";
        await this.altaCliente.AltaCliente(this.cliente);
        this.dismiss();
        const alert = await this.alertController.create({
          message: '<h1>¡Cuenta Anonima creada con exito!</h1>Ahora podras iniciar sesion como anonimo.',
          cssClass: 'custom-alert-danger',
          buttons: [
            {
              text: '¡Exelente! volver al inicio',
              handler: () => {
                this.router.navigate(['/']);
              }
            }]
        }); 
        await alert.present();
      }
    }
  }

}
