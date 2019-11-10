import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ComandaServiceService } from 'src/app/services/comanda-service.service';
import { AlertController, NavController } from '@ionic/angular';
import { ActorTypeBase } from 'src/app/model/actorTypeBase';
import { ActorType } from 'src/app/model/actorType';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-alta',
  templateUrl: './alta.page.html',
  styleUrls: ['./alta.page.scss'],
})
export class AltaPage implements OnInit {
  myForm: FormGroup;
  image: string;
  actorType: ActorTypeBase;
  code: any;
  typeEmployed: string;
  titleTypeEmployed: string;

  constructor(
    private comandaService: ComandaServiceService,
    private alertController: AlertController,
    private barcodeScanner: BarcodeScanner,
    private camera: Camera,
    public navCtrl: NavController,
    public activeRoute: ActivatedRoute) { }

  ngOnInit() {
    this.myForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      dni: new FormControl('', [Validators.required, this.onlyNumbersValidator, this.lengthValidator(8)]),
      cuil: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, this.validatorFormatt]),
      password: new FormControl('', [Validators.required])
    });
   
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
    this.myForm.controls.cuil.setValue(this.calcularCuil(code[posDni], code[posSexo]).replace(/ /g, ''));
  }

  calcularCuil(documentNumber, gender) {
    'use strict';
    const HOMBRE = ['HOMBRE', 'M', 'MALE'],
      MUJER = ['MUJER', 'F', 'FEMALE'],
      SOCIEDAD = ['SOCIEDAD', 'S', 'SOCIETY'];
    let AB, C: any;

    /**
     * Verifico que el documentNumber tenga exactamente ocho numeros y que
     * la cadena no contenga letras.
     */
    /*if (documentNumber.length !== 8 || isNaN(documentNumber)) {
      if (documentNumber.length === 7 && !isNaN(documentNumber)) {
        documentNumber = '0'.concat(documentNumber);
      } else {
        // Muestro un error en caso de no serlo.
        throw new Error('El numero de documentNumber ingresado no es correcto.');
      }
    }*/

    /**
     * De esta manera permitimos que el gender venga en minusculas,
     * mayusculas y titulo.
     */
    gender = gender.toUpperCase();

    // Defino el valor del prefijo.
    if (HOMBRE.indexOf(gender) >= 0) {
      AB = '20';
    } else if (MUJER.indexOf(gender) >= 0) {
      AB = '27';
    } else {
      AB = '30';
    }

    /*
     * Los numeros (excepto los dos primeros) que le tengo que
     * multiplicar a la cadena formada por el prefijo y por el
     * numero de documentNumber los tengo almacenados en un arreglo.
     */
    const multiplicadores = [3, 2, 7, 6, 5, 4, 3, 2];

    // Realizo las dos primeras multiplicaciones por separado.
    // tslint:disable-next-line:radix
    let calculo = ((parseInt(AB.charAt(0)) * 5) + (parseInt(AB.charAt(1)) * 4));

    /*
     * Recorro el arreglo y el numero de documentNumber para
     * realizar las multiplicaciones.
     */
    for (let i = 0; i < 8; i++) {
      // tslint:disable-next-line:radix
      calculo += (parseInt(documentNumber.charAt(i)) * multiplicadores[i]);
    }

    // Calculo el resto.
    // tslint:disable-next-line:radix
    const resto = calculo % 11;

    /*
     * Llevo a cabo la evaluacion de las tres condiciones para
     * determinar el valor de C y conocer el valor definitivo de
     * AB.
     */
    if ((SOCIEDAD.indexOf(gender) < 0) && (resto === 1)) {
      if (HOMBRE.indexOf(gender) >= 0) {
        C = '9';
      } else {
        C = '4';
      }
      AB = '23';
    } else if (resto === 0) {
      C = '0';
    } else {
      C = 11 - resto;
    }

    // Show example
    console.log([AB, documentNumber, C].join('-'));

    // Generate cuit
    const cuil = [AB, documentNumber, C].join('');

    return cuil;
  }

  save() {
    const typeE = this.typeEmployed === 'S' ? 'S' : this.myForm.get('tiposEmpleados').value;
    const img = this.image ? this.image : '';
    try {
      this.actorType = new ActorTypeBase(
        this.myForm.get('name').value,
        this.myForm.get('lastName').value,
        this.myForm.get('dni').value,
        this.myForm.get('cuil').value,
        img,
        typeE);

      this.comandaService.saveActorType(this.actorType);
      this.presentAlertSuccess('El alta se realizo exitosamente');
    } catch (error) {
      this.presentAlertSuccess(error.message);
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
      if (control.value !== undefined && (isNaN(control.value) || control.value.length < minMax)) {
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


}
