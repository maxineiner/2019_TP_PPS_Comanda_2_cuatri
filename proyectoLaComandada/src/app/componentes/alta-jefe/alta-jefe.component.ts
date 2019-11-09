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
  entidad : Entidad = {nombre : "" , apellido : "" , dni : "" , cuit : "" , perfil : "" , correo : "" , clave : "" };
  icono="eye-off";


  constructor(private altaServicio : AltaService,private camara : Camera,private barcodeScanner : BarcodeScanner,public domSanitezer : DomSanitizer) { 
    this.entidad.foto = "../../../assets/user.png";
  }

  ngOnInit(){}

  async registrar(){
    console.log("Perfil :" + this.entidad.perfil);
    if(this.entidad.nombre !== "" && this.entidad.apellido !== "" && this.entidad.dni !== "" && this.entidad.cuit !== "" && this.entidad.perfil !== "" && this.entidad.correo !== "" && this.entidad.clave !== ""){
      if(await this.altaServicio.altaeEntidad(this.entidad)){
        console.log("Se ha registrado correctamente");
        this.altaServicio.presentToast("Se ha registrado como " + this.entidad.perfil + " correctamente.","success");
      }
    }
    else{
      this.altaServicio.presentToast("Por favor, complete todos los campos para poder regsitrarse correctamente","primary");
    }
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
     let base64Image = 'data:image/jpeg;base64,' + imageData;
     this.entidad.foto = base64Image;

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
