import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ComandaServiceService } from 'src/app/services/comanda-service.service';
import { AlertController, NavController } from '@ionic/angular';
import { ActorTypeBase } from 'src/app/model/actorTypeBase';
import { ActorType } from 'src/app/model/actorType';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { ActivatedRoute } from '@angular/router';
import { timer } from 'rxjs';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { Cliente } from 'src/app/model/cliente';
import {ListaEsperaService } from 'src/app/services/lista-espera.service'
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  myForm: FormGroup;
  image: string;
  // actorType: ActorTypeBase;
  auxCliente: Cliente;
  code: any;
  typeEmployed: string;
  titleTypeEmployed: string;
  showSplash = true;


  constructor(
    private comandaService: ComandaServiceService,
    private alertController: AlertController,
    private barcodeScanner: BarcodeScanner,
    private camera: Camera,
    public navCtrl: NavController,
    public activeRoute: ActivatedRoute,
    private splashScreen: SplashScreen,
    private listaEsperaService:ListaEsperaService) { }

  ngOnInit() {
    this.myForm = new FormGroup({
      email: new FormControl('', [Validators.required, this.validatorFormatt]),
      name: new FormControl('', [Validators.required]),
      lastName: new FormControl(''),
      dni: new FormControl('',[this.onlyNumbersValidator, this.lengthValidator(8)]),
      pass: new FormControl('',[Validators.required,this.validatorPassFormatt,this.lengthMinValidator(6)])
    });
    timer(3600).subscribe(() => {this.showSplash = false; });7
  }

  /** funcion para tomar la foto con @ionic-native/camera/ngx */
  takePhoto() {
    const options: CameraOptions = {
      quality: 50,
      targetWidth: 400,
      targetHeight: 400,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.CAMERA,
      allowEdit: false,
      encodingType: this.camera.EncodingType.JPEG,
      correctOrientation: true,
    };
    this.camera.getPicture(options).then((imageData) => {
      if (imageData) {
        this.image = `data:image/jpeg;base64,${imageData}`;
      }
    }, (err) => {
      this.presentAlert(err);
    });
  }

  barcodeScannerFn() {
    this.barcodeScanner.scan({ prompt: 'Escanea el DNI', formats: 'PDF_417' }).then(barcodeData => {
      const code = barcodeData.text.split('@');
      if (code[4].length === 8) {
        this.setControlsValues(code, 2, 1, 4, 3);
      } else {
        // para documentos viejos
        this.setControlsValues(code, 5, 4, 1, 8);
      }
    }).catch(err => {
      this.presentAlert(err.message);
    });
  }

  setControlsValues(code, posName, posLastName, posDni, posSexo) {
    this.myForm.controls.name.setValue(code[posName]);
    this.myForm.controls.lastName.setValue(code[posLastName]);
    this.myForm.controls.dni.setValue(code[posDni].trim());
  }

  save() {
    if(this.image == null)
    {
        console.log("Tienen que tener una foto");
        this.presentAlert("El registro debe incluir minimo una foto , un mail y el nombre");
      
    } 
    else {
      // const typeE = this.typeEmployed === 'S' ? 'S' : this.myForm.get('tiposEmpleados').value;
       const img = this.image ? this.image : '';
      try {
        this.auxCliente = new Cliente(
          this.myForm.get('email').value,
          this.myForm.get('name').value,
          this.myForm.get('lastName').value,
          this.myForm.get('dni').value,
          img,
          'CLIENTE',
          'ESPERA',
          this.myForm.get('pass').value
        )
        this.presentAlertSuccess('El pedido de registro se realizó exitosamente, te llegara un mail cuando se verifique tu usuario');
        console.log(this.auxCliente);
        this.listaEsperaService.AddClientToWaitingList(this.auxCliente);
        // this.comandaService.saveActorType(this.actorType);
        
      } catch (error) {
        this.presentAlertSuccess(error.message);
      }
    }

  }

  async presentAlert(err) {
    const alert = await this.alertController.create({
      header: 'Aviso',
      subHeader: 'Error',
      message: err,
      buttons: ['OK']
    });

    await alert.present();
  }

  async presentAlertSuccess(mensaje) {
    const alert = await this.alertController.create({
      header: 'Aviso',
      message: mensaje,
      buttons: [
        {
          text: '',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Aceptar',
          handler: () => {
            this.navCtrl.navigateRoot('home');
          }
        }
      ]
    });

    await alert.present();
  }

  /** custom validators */
  onlyNumbersValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const value = control.value;
    if (!/^([0-9])*$/.test(value)) {
      return { error: true };
    }
    return null;
  }

  lengthValidator(minMax: number) {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      if (control.value !== undefined && (isNaN(control.value) || (control.value.length < minMax && control.value.length != 0 ))) {
        return { lengthError: true };
      }
      return null;
    };
  }
  lengthMinValidator(min: number) {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      if ( control.value.length < min) {
        
        console.log("error por el lenghtminvalidator");
        return { lengthError: true };
      }
      return null;
    };
  }
  
  validatorFormatt(control: AbstractControl) {
    let exp = /^[a-zA-Z0-9.&/*+=?^_{}~-]+@[a-zA-Z0-9-]+?(\.[a-zA-Z0-9-]+){1,}$/;
    if (control.value.length > 0 && !exp.exec(control.value)) {
      return { emailErrFormat: true }
    }
    return null;
  }
  validatorPassFormatt(control: AbstractControl) {
    let exp = /^[a-zA-Z0-9.&/*+=?^_{}~-]$/;
  
    if (control.value.length <6  && !exp.exec(control.value))  {

      return { passErrFormat: true }
    }
    return null;
  }

  fotoPrueba() {
    
    this.image = 'https://cdn.tn.com.ar/sites/default/files/styles/1366x765/public/2018/10/15/comida-chatarra-abstinencia.jpg';
    console.log("foto subida");
  }



}
