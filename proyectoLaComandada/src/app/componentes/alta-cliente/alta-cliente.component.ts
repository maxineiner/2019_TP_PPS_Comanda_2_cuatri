import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { AltaClienteService } from 'src/app/servicios/alta-cliente.service';

@Component({
  selector: 'app-alta-cliente',
  templateUrl: './alta-cliente.component.html',
  styleUrls: ['./alta-cliente.component.scss'],
})
export class AltaClienteComponent implements OnInit {

  constructor(private camera: Camera,private altaCliente : AltaClienteService) { }

  ngOnInit() {}

  //atributos
  cliente = {nombre : "" , apellido : "" , dni : "" , perfil : "cliente" , correo : "" , clave : "",foto:"../../assets/usos/user.png"};
  options : CameraOptions = {
    quality: 40,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
    correctOrientation: true
  }

  //funciones
  tomarFoto()
  {
    this.camera.getPicture(this.options).then((imageData) => {
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      this.cliente.foto = base64Image;
    }, (err) => {
      // Handle error
    });
  }

  registrar()
  {
    console.log(this.cliente);
  }

}
