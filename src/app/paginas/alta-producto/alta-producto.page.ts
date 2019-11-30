import { Component, OnInit } from '@angular/core';
import { Producto } from "../../interfaces/producto";
import { FirestorageService } from 'src/app/servicios/firestorage.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ProductosService } from 'src/app/servicios/productos.service';
import { timer } from 'rxjs';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { AuthService } from 'src/app/servicios/auth.service';

@Component({
  selector: 'app-alta-producto',
  templateUrl: './alta-producto.page.html',
  styleUrls: ['./alta-producto.page.scss'],
})
export class AltaProductoPage implements OnInit {

  producto: Producto = {
    nombre: '', //
    descripcion: '',//
    tiempo: '',
    precio: 0,
    foto_1: '',//
    foto_2: '',//
    foto_3: '',//
    qr: '',//
    sector: '',//
  } as Producto;
  error = '';
  constructor(
    private fire: FirestorageService,
    private camera: Camera,
    private route: Router,
    private producto_service: ProductosService,
    private barcodeScanner: BarcodeScanner,
    private auth:AuthService
  ) { }

  ngOnInit() {
    this.producto.sector = this.auth.getUsuario()['perfil']
  }


  CrearProducto() {
    let prod_aux = this.producto;
    if (
      prod_aux.descripcion != '' &&
      prod_aux.nombre != '' &&
      prod_aux.tiempo != '' &&
      prod_aux.precio > 0 &&
      prod_aux.foto_1 != '' &&
      prod_aux.foto_2 != '' &&
      prod_aux.foto_3 != '' &&
      prod_aux.qr != ''
    ) {
      this.producto_service.CrearProducto(prod_aux).then(ret => {
        this.route.navigate(['/home']);
      }).catch((err) => {
        this.error = 'Error al crear el producto';
        timer(3000).subscribe(() => { this.error = ''; })

      });
    }
  }

  tomarfoto(numero) {
    const camOptions: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.CAMERA,
      allowEdit: false,
      encodingType: this.camera.EncodingType.JPEG,
      targetWidth: 500,
      targetHeight: 500,
      saveToPhotoAlbum: true,
      correctOrientation: true,
    };
    let aux;
    this.camera.getPicture(camOptions).then(async (pictureAux) => {
      aux = pictureAux;
      this.fire.uploadFotoToFirebase(aux).then(url=>{
        switch (numero) {
          case 1:
            this.producto.foto_1 = url;
            break;
          case 2:
            this.producto.foto_2 = url;
            break;
          case 3:
            this.producto.foto_3 = url;
            break;
        }
      })

    }, error => {
      // alert(error)
      if (error === 'No Image Selected') {
        console.log(error);
      } else {
        console.log(error);
      }
      console.log(error);
    }).catch(err => {
      // alert(err)
      console.log(err);
    });

  }

  tomarqr() {
    this.barcodeScanner.scan().then(resultado => {
      this.producto.qr = resultado.text;
    });
  }

}
