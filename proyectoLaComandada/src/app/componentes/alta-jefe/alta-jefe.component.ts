import { Component, OnInit } from '@angular/core';
import { Entidad } from 'src/app/modals/entidad';
import { AltaService } from 'src/app/servicios/alta.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { DomSanitizer } from '@angular/platform-browser';
import { Base64 } from '@ionic-native/base64/ngx';
@Component({
  selector: 'app-alta-jefe',
  templateUrl: './alta-jefe.component.html',
  styleUrls: ['./alta-jefe.component.scss'],
})
export class AltaJefeComponent implements OnInit {

 
  mostrar : boolean = true;
  mostrarFoto : string = "";
  tipo  : string = "password"; 
  entidad;

  icono="eye-off";
  //datos
  nombre : string ="";
  correo : string ="";
  clave : string ="";
  apellido : string
  dni : string;
  cuit : string;
  perfil : string;
  foto : string;
  //

  constructor(private altaServicio : AltaService,private camara : Camera,private barcodeScanner : BarcodeScanner,public domSanitezer : DomSanitizer,private base64:Base64) { 
    this.foto = "../../../assets/user.png";
  }

  ngOnInit(){}

  registrar(){
    this.entidad = new Entidad(this.nombre,this.apellido,this.dni,this.cuit,this.perfil,this.foto,this.correo,this.clave);    
    this.altaServicio.altaeEntidad(this.entidad);
  }

  tomarFoto(){

    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camara.DestinationType.DATA_URL,
      encodingType: this.camara.EncodingType.JPEG,
      mediaType: this.camara.MediaType.PICTURE,
      correctOrientation: true, // con esto corregis la orientacion
    }
    
    this.camara.getPicture(options).then((imageData) => {
    //  console.log(imageData);
     let base64Image = 'data:image/jpeg;base64,' + imageData;
     this.foto = base64Image;
     //vamo a hacer un par de cosas,que?
     console.log(base64Image.length);
     console.log(base64Image);
    }, (err) => {
     console.log(err);
    });
  }

  cargarPorQR(){
    this.barcodeScanner.scan().then(barcodeData => {
      let obj = JSON.parse(barcodeData.text);
      this.entidad.nombre = obj.nombre;
      this.entidad.apellido = obj.apellido;
      this.entidad.dni = obj.dni;
     }).catch(err => {
         console.log('Error', err);
     });
  }

  verClave(){
    if(this.mostrar){
       this.tipo = "text";
       this.icono ="eye"
       this.mostrar = false;
    }
    else{
      this.tipo = "password";
      this.icono ="eye-off"
      this.mostrar = true;
    }
  }

}
