import { AlertService } from 'src/app/servicios/alert.service';
import { FirestorageService } from './../../servicios/firestorage.service';
import { Component } from '@angular/core';
import { EncuestasService } from 'src/app/servicios/encuestas.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

@Component({
  selector: 'app-encuesta-cliente',
  templateUrl: './encuesta-cliente.page.html',
  styleUrls: ['./encuesta-cliente.page.scss'],
})
export class EncuestaClientePage {
  public nivelSatisfaccion: number;
  public amabilidad: string;
  public calidadComida: boolean;
  public calidadBebida: boolean;
  public atencion: boolean;
  public organizacion: boolean;
  public salonYAmbiente: boolean;
  public recomendacion: string;
  public comentarios: string;
  public urlFoto1: string;
  public urlFoto2: string;
  public urlFoto3: string;
  public usuario: any;

  constructor(private encuestasService: EncuestasService, private camera: Camera,
    private firestorageService: FirestorageService, private alert: AlertService) {
    this.nivelSatisfaccion = 6;
    this.calidadComida = false;
    this.calidadBebida = false;
    this.atencion = false;
    this.organizacion = false;
    this.salonYAmbiente = false;
    this.urlFoto1 = '';
    this.urlFoto2 = '';
    this.urlFoto3 = '';
    this.usuario = JSON.parse(localStorage.getItem('usuario'));
  }

  public tomarFoto() {
    if (this.urlFoto3 !== '') {
      this.alert.mensaje('', 'No puede cargar más de 3 fotos!');
      return;
    }

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
        if (this.urlFoto1 === '') { this.urlFoto1 = imageURL; }
        else if (this.urlFoto2 === '') { this.urlFoto2 = imageURL; }
        else { this.urlFoto3 = imageURL; }
      });
    });
  }

  public enviarEncuesta() {
    this.encuestasService.addEncuesta({
      idCliente: this.usuario.id,
      nivelSatisfaccion: this.nivelSatisfaccion,
      amabilidad: this.amabilidad === undefined ? null : this.amabilidad,
      calidadComida: this.calidadComida,
      calidadBebida: this.calidadBebida,
      atencion: this.atencion,
      organizacion: this.organizacion,
      salonYAmbiente: this.salonYAmbiente,
      recomendacion: this.recomendacion === undefined ? null : this.recomendacion === 'true' ? true : false,
      comentarios: this.comentarios === undefined ? null : this.comentarios,
      foto1: this.urlFoto1,
      foto2: this.urlFoto2,
      foto3: this.urlFoto3,
      fecha: new Date()
    }).then(() => {
      this.alert.mensaje('', 'Encuesta cargada exitosamente!');
    }).catch(error => { this.alert.mensaje('ERROR', error); });
  }
}
