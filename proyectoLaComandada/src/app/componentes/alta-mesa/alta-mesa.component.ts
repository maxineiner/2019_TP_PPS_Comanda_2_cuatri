import { Component, OnInit } from '@angular/core';
import { Mesa } from 'src/app/modals/mesa';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { AltaService } from 'src/app/servicios/alta.service';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-alta-mesa',
  templateUrl: './alta-mesa.component.html',
  styleUrls: ['./alta-mesa.component.scss'],
})
export class AltaMesaComponent implements OnInit {

  mesa : Mesa = {tipo : ""};
  tipo  : string = "password"; 
  icono="eye-off";
  mostrar : boolean = true;
  mesas = [];
  constructor(private altaService : AltaService,private camara : Camera,private barcodeScanner : BarcodeScanner,public domSanitezer : DomSanitizer) { 
    this.mesa.foto = "../../../assets/mesa.jpg"
  }

  ngOnInit() {
     this.altaService.traerMesas().subscribe(data => {
       this.mesas = data;
     })
  }

  registrar(){
     console.log(this.mesa);
     let flag = 0
     if(this.mesa.tipo != "" && this.mesa.foto != "../../../assets/mesa.jpg"   && this.mesa.numero != null && this.mesa.cantidad != null){
      this.mesas.forEach(element => {
        if(element.numero == this.mesa.numero){
            this.altaService.presentToast("Numero de mesa ya registrado" , "primary");
            flag = 1;
        }
      })
      console.log("Flag: " + flag);
      if(flag == 0){
        this.altaService.altaMesa(this.mesa);
        this.altaService.presentToast("Mesa agregada con exito" , "success");
      }
    }
    else{
      this.altaService.presentToast("Por favor, complete todos los campos incluyendo la foto" , "primary");
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
     this.mesa.foto = base64Image;

     console.log(base64Image.length);
     console.log(base64Image);
    }, (err) => {
     console.log(err);
    });
  }
  cargarPorQR(){
    this.barcodeScanner.scan().then(barcodeData => {
      let obj = JSON.parse(barcodeData.text);
      console.log(obj);
      this.mesa.numero = obj.numero;
      this.mesa.cantidad = obj.cantidad;
      this.mesa.tipo = obj.tipo;
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
