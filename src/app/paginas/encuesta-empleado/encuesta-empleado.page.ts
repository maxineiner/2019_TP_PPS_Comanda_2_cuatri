import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/servicios/alert.service';
import { CameraOptions, Camera } from '@ionic-native/camera/ngx';
import { FirestorageService } from 'src/app/servicios/firestorage.service';
import { EncuestasService } from 'src/app/servicios/encuestas.service';
import { AuthService } from 'src/app/servicios/auth.service';

@Component({
  selector: 'app-encuesta-empleado',
  templateUrl: './encuesta-empleado.page.html',
  styleUrls: ['./encuesta-empleado.page.scss'],
})
export class EncuestaEmpleadoPage implements OnInit {
  public encuesta = {
    sector: '',
    hora: '',
    limpieza: '5',
    comentario: '',
    foto: '',
    orden: false
  };

  constructor(private alertServ: AlertService, private camera: Camera,
    private firestorageService: FirestorageService, private encuestaServ: EncuestasService, private auth:AuthService) {
      this.encuesta.sector = this.auth.getUsuario()['perfil'];
     }

  ngOnInit() {
  }

  public TomarFoto() {
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
      this.firestorageService.uploadFotoToFirebase(imageData).then(imageURL => {
        this.encuesta.foto = imageURL;
      });
    });
  }
  public EnviarEncuesta() {
    console.log(this.encuesta);
    if (this.encuesta.comentario == '' || this.encuesta.foto == '' ||
    this.encuesta.hora == '' || this.encuesta.sector == '') {
      this.alertServ.mensaje('Empleado!', 'Debe completar todos los campos de la encuesta obligatoriamente!');
    } else {
      this.encuestaServ.addEncuestaEmpleado(this.encuesta).then( () => {
        this.alertServ.mensaje('', 'La encuesta se guardó con éxito');
      });
    }
  }
}
