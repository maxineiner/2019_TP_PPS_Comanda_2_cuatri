import { AlertService } from 'src/app/servicios/alert.service';
import { Router } from '@angular/router';
import { AuthService } from './../../servicios/auth.service';
import { FirestorageService } from './../../servicios/firestorage.service';
import { Component } from '@angular/core';
import { BarcodeScannerOptions, BarcodeScanResult, BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

@Component({
  selector: 'app-alta-cliente',
  templateUrl: './alta-cliente.page.html',
  styleUrls: ['./alta-cliente.page.scss'],
})
export class AltaClientePage {
  public nombreUsuario: string;
  public apellidoUsuario: string;
  public dniUsuario: string;
  public correoUsuario: string;
  public claveUsuario: string;
  public dataFotoUsuario: string;
  public urlFotoUsuario: string;
  public nacionalidadUsuario: string;
  public nacimientoUsuario: string;
  public tipoRegistro: string;
  public dataDNI: string[];

  constructor(private barcodeScanner: BarcodeScanner, private camera: Camera, public alert: AlertService,
  private authService: AuthService, private firestorageService: FirestorageService, private router: Router) {
    this.nombreUsuario = '';
    this.apellidoUsuario = '';
    this.dniUsuario = '';
    this.correoUsuario = '';
    this.claveUsuario = '';
    this.dataFotoUsuario = '';
    this.urlFotoUsuario = '';
    this.nacionalidadUsuario = '';
    this.nacimientoUsuario = '';
    this.tipoRegistro = 'Nuevo usuario';
  }

  public tomarDatosDNI() {
    const options: BarcodeScannerOptions = { prompt: 'Escanee el DNI', formats: 'PDF_417' };
    this.barcodeScanner.scan(options).then((resultado: BarcodeScanResult) => {
      this.dataDNI = (resultado.text).split('@');
      this.dniUsuario = this.dataDNI[1].trim();
      this.apellidoUsuario = this.dataDNI[4];
      this.nombreUsuario = this.dataDNI[5];
    });
  }

  public tomarFotoUsuario() {
    const options: CameraOptions = {
      quality: 50,
      targetWidth: 500,
      targetHeight: 500,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.ALLMEDIA,
      sourceType: this.camera.PictureSourceType.CAMERA,
      correctOrientation: true,
      saveToPhotoAlbum: true
    };

    this.camera.getPicture(options).then((imageData) => {
      this.dataFotoUsuario = imageData;
      this.firestorageService.uploadFotoToFirebase(imageData).then(imageURL => {
        this.urlFotoUsuario = imageURL;
      });
    });
  }

  public cargarUsuario() {
    if ((this.tipoRegistro === 'Anónimo' && this.nombreUsuario === '') ||
    this.tipoRegistro === 'Nuevo usuario' && (this.nombreUsuario === '' || this.apellidoUsuario === '' ||
    this.dniUsuario === '' || this.correoUsuario === '' || this.claveUsuario === '')) {
      this.alert.mensaje('', 'Debe completar todos los campos');
      return;
    }

    if (this.tipoRegistro === 'Nuevo usuario' && this.claveUsuario.length < 6) {
      this.alert.mensaje('', 'La clave debe tener al menos 6 caracteres');
      return;
    }

    let emailRegex;
    emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

    if (this.tipoRegistro === 'Nuevo usuario' && !emailRegex.test(this.correoUsuario)) {
      this.alert.mensaje('', 'Debe ingresar un e-mail válido');
      return;
    }

    if (this.urlFotoUsuario === '') {
      this.alert.mensaje('', 'Debe cargar una foto');
      return;
    }

    if (this.tipoRegistro === 'Nuevo usuario') {
      this.authService.CrearAuth(this.correoUsuario, this.claveUsuario, {
        uid: '',
        foto: this.urlFotoUsuario,
        nombre: this.nombreUsuario,
        apellido: this.apellidoUsuario,
        mail: this.correoUsuario,
        dni: this.dniUsuario,
        activo: false,
        perfil: 'cliente'
      }, this.dataFotoUsuario).then(usuario => {
        this.alert.mensaje('', 'Usuario registrado exitosamente!');
      }).catch(error => {
        this.alert.mensaje('', 'ERROR: ' + error);
      });
    }
    else {
      this.authService.loginAnonimo({
        foto: this.urlFotoUsuario,
        nombre: this.nombreUsuario,
        perfil: 'anonimo'
      }, this.dataFotoUsuario).then(usuario => {
        this.router.navigate(['/home-cliente']);
        this.alert.mensaje('Bienvenido!', 'Ingresó como usuario anónimo');
      }).catch(error => {
        this.alert.mensaje('ERROR',  error);
      });
    }
  }
}
