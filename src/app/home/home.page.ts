import { Component, OnInit } from '@angular/core';
import { AuthService } from "../servicios/auth.service";
import { Anonimo, Cliente, Empleado } from '../interfaces/usuario';
import { Router, ActivatedRoute } from '@angular/router';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  url = '';
  constructor(
    private auth: AuthService,
    private publicRouter: Router,
    private camera: Camera
  ) { }

  ngOnInit() {
  }

  mover(url) {
    console.log(url)
    this.publicRouter.navigate([url])
  }
    // tomarFoto(usuario){
    //   let data= {} as Anonimo;
    //   data.nombre='Marcos';
    //   data.mail = 'marcosTest1asd12@gmail.com';
    //   data.foto = 'ejemploErrone';
    //   data.activo = true;
    //   data.perfil = 'anonimo'
    //   const camOptions: CameraOptions = {
    //     quality: 50,
    //     destinationType: this.camera.DestinationType.DATA_URL,
    //     sourceType: this.camera.PictureSourceType.CAMERA,
    //     allowEdit: false,
    //     encodingType: this.camera.EncodingType.JPEG,
    //     targetWidth: 500,
    //     targetHeight: 500,
    //     saveToPhotoAlbum: true,
    //     correctOrientation: true,
    //   };

    //   this.camera.getPicture(camOptions).then(async (pictureAux) => {
    //     this.auth.CrearAuth(data.mail, '123456789',data, pictureAux).then(aa=>{this.tests = aa}).catch(err=>{this.tests=err});
    //     }, error => {
    //       alert(error)
    //       console.log(error);
    //       this.tests=error
    //       if (error === 'No Image Selected') {
    //         console.log(error);
    //       } else {
    //         console.log(error);
    //       }
    //       console.log(error);
    //     }).catch(err => {
    //       this.tests=err;
    //       alert(err)
    //       console.log(err);
    //   });
    // }
}
