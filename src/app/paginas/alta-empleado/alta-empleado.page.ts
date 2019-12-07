import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Empleado } from 'src/app/interfaces/usuario';
import { FirestorageService } from 'src/app/servicios/firestorage.service';
import { ErrorService } from 'src/app/servicios/error.service';
import { AuthService } from 'src/app/servicios/auth.service';
import { Router } from '@angular/router';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { AlertService } from 'src/app/servicios/alert.service';

@Component({
  selector: 'app-alta-empleado',
  templateUrl: './alta-empleado.page.html',
  styleUrls: ['./alta-empleado.page.scss'],
})
export class AltaEmpleadoPage implements OnInit {
  public faltan: boolean;
  public empleado: Empleado;
  public password = '';
  public emailmal: boolean;
  private imageData: string;
  public faltaFoto: boolean;

  constructor(private camera: Camera, private fotosService: FirestorageService,
    private errorHand: ErrorService, private authService: AuthService,
    private router: Router, private barcodeScanner: BarcodeScanner,
    private alertServ: AlertService) {
      this.empleado  = {
        uid: '',
        nombre: '',
        apellido: '',
        dni: '',
        cuil: '',
        mail: '',
        perfil: '',
        foto: '',
        activo: true
      };
      this.password = '';
    }

  ngOnInit() {
  }
  public SacarFoto() {
    const camOptions: CameraOptions = {
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
    this.camera.getPicture(camOptions).then( (pictureAux) => {
      this.imageData = pictureAux;
      this.fotosService.uploadFotoToFirebase(pictureAux).then( (imageURL) => {
        this.empleado.foto = imageURL;
      });
    }, error => {
      if (error === 'No Image Selected') {
        this.errorHand.MostrarErrorSoloLower('No se sacó imágen');
      } else {
        this.errorHand.MostrarErrorSoloLower('Error al sacar foto ' + error);
      }
      console.log(error);
    }).catch(err => {
      console.log(err);
    });
  }
  public Ingresar() {
    this.faltan = false;
    this.emailmal = false;
    this.faltaFoto = false;
    if (this.empleado.nombre !== '' && this.empleado.apellido !== '' &&
    this.empleado.dni !== '' && this.empleado.cuil !== '' && this.empleado.perfil !== ''
    && this.empleado.mail !== '' && this.password !== '') {
      const emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
      if (emailRegex.test(this.empleado.mail)) {
        if (this.empleado.foto !== '') {
          this.authService.CrearAuth(this.empleado.mail, this.password, this.empleado, this.imageData).then( () => {
            this.alertServ.mensaje('', 'Empleado agregado!');
            this.router.navigate(['/home']);
          });
        } else {
          this.faltaFoto = true;
        }
      } else {
        this.emailmal = true;
      }
    } else {
      this.faltan = true;
    }
  }
  public LeerQR() {
    this.barcodeScanner.scan().then(barcodeData => {
      // alert(barcodeData.text);
      try {
        const datos = barcodeData.text.split('@');
        this.empleado.cuil = datos[0];
        this.empleado.apellido = datos[1];
        this.empleado.nombre = datos[2];
        this.empleado.dni = datos[4];
      } catch (err) {
        this.errorHand.MostrarErrorSoloLower('Error: ' + err);
      }
     }).catch(err => {
        this.errorHand.MostrarErrorSoloLower('Error: ' + err);
        console.log('Error', err);
     });
  }

}
