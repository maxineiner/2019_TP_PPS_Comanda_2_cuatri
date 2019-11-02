import { Component, OnInit } from '@angular/core';
import { Entidad } from 'src/app/modals/entidad';
import { AltaService } from 'src/app/servicios/alta.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
@Component({
  selector: 'app-alta-jefe',
  templateUrl: './alta-jefe.component.html',
  styleUrls: ['./alta-jefe.component.scss'],
})
export class AltaJefeComponent implements OnInit {

  entidad = {} as Entidad;
  mostrar : boolean = true;
  tipo = "password";
  constructor(private altaServicio : AltaService,private camara : Camera,private barcodeScanner : BarcodeScanner) { 
    this.entidad.foto = "../../../assets/user.png";
  }

  ngOnInit() {}

  registrar(){
    this.altaServicio.altaeEntidad(this.entidad);
  }
  tomarFoto(){
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camara.DestinationType.FILE_URI,
      encodingType: this.camara.EncodingType.JPEG,
      mediaType: this.camara.MediaType.PICTURE
    }
    
    this.camara.getPicture(options).then((imageData) => {
     let base64Image = 'data:image/jpeg;base64,' + imageData;
     this.entidad.foto = base64Image;
    }, (err) => {
     console.log(err);
    });
  }
  cargarPorQR(){
    this.barcodeScanner.scan().then(barcodeData => {
      console.log('Barcode data', barcodeData);
      let obj = JSON.parse(barcodeData.text);

      this.entidad.nombre = obj.nombre;
      this.entidad.apellido = obj.apellido;
      this.entidad.dni = obj.dni;
     }).catch(err => {
         console.log('Error', err);
     });
  }
  clave(){
    if(this.mostrar){
       this.tipo = "text";
       this.mostrar = false;
    }
    else{
      this.tipo = "password";
      this.mostrar = true;
    }
  }

}
