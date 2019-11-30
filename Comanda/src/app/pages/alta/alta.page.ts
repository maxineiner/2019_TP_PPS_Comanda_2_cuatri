import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ComandaServiceService } from 'src/app/services/comanda-service.service';
import { AlertController, NavController, ModalController } from '@ionic/angular';
import { ActorTypeBase } from 'src/app/model/actorTypeBase';
import { ActorType } from 'src/app/model/actorType';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthService } from 'src/app/services/auth.service';
import { AlertModalPage } from 'src/app/modals/alert-modal/alert-modal.page';

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
  titleTypeEmployed: string = 'Alta Dueño Supervisor';

  constructor(
    private comandaService: ComandaServiceService,
    private alertController: AlertController,
    private barcodeScanner: BarcodeScanner,
    private camera: Camera,
    private navCtrl: NavController,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private modalController: ModalController) { }

  ngOnInit() {
    this.myForm = new FormGroup({
      name: new FormControl('', [Validators.required, this.soloLetras]),
      lastName: new FormControl('', [Validators.required, this.soloLetras]),
      dni: new FormControl('', [Validators.required, this.onlyNumbersValidator, this.lengthValidator(8)]),
      cuil: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, this.validatorFormatt]),
      password: new FormControl('', [Validators.required])
    });

    this.route.queryParams.subscribe((params) => {
      this.typeEmployed = params['tipo'];
      if (this.typeEmployed != 'S') {
        this.myForm.addControl('tiposEmpleados', new FormControl('', [Validators.required]));
        this.titleTypeEmployed = 'Alta Empleado';
      }
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
      this.presentModalCustom('Error',err);
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
      this.presentModalCustom('Error',err.message);
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

  async save() {
    const typeE = this.typeEmployed === 'S' ? 'SUPERVISOR' : this.myForm.get('tiposEmpleados').value;
    const img = this.image ? this.image : '';

    try {      
      this.generateObj(typeE, img);

      let data = await this.authService.createUserWithEmailAndPassword(this.actorType.emial, this.actorType.password);
      let result = await this.comandaService.saveActorType(this.actorType);
      let rol = this.comandaService.saveRol(data['user']['uid'], this.actorType.type);
      this.presentModalCustom('Info','El alta se realizo exitosamente');
    } catch (error) {
      this.presentModalCustom('Error',error.message);
    }
  }

  generateObj(typeE, img) {
    return this.actorType = new ActorTypeBase(
      this.myForm.get('name').value,
      this.myForm.get('lastName').value,
      this.myForm.get('dni').value,
      this.myForm.get('cuil').value,
      img, typeE,
      this.myForm.get('email').value,
      this.myForm.get('password').value
    );
  }  

  async presentModalCustom(header: string, message: string) {
    const modal = await this.modalController.create({
      component: AlertModalPage,
      cssClass: header === 'Error' ? 'my-custom-modal-css-error' : 'my-custom-modal-css',
      componentProps: {
        header: header,
        message: message,
        action: header == 'Error' ? 'error' : header == 'Info' ? 'info' : 'confirm',
      }
    });

    modal.onDidDismiss()
      .then((data) => {
        this.router.navigate(['home']);
        });

    return await modal.present();
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

  soloLetras(control: AbstractControl): { [key: string]: boolean } | null {
    const value = control.value;
    let regex = /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/g;
    if (control.value.length > 0 && !regex.exec(value)) {
      return { errorSoloLetras: true };
    }
    return null;
  }

}
