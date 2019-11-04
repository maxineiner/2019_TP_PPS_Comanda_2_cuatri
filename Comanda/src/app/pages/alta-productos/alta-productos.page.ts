import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ComandaServiceService } from 'src/app/services/comanda-service.service';
import { AlertController } from '@ionic/angular';
import { ActorTypeBase } from 'src/app/model/actorTypeBase';
import { ActorType } from 'src/app/model/actorType';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { Producto } from 'src/app/model/producto';
import { Imagen } from 'src/app/model/imagenes';
// import { ImagePicker, ImagePickerOptions } from '@ionic-native/image-picker/ngx';
@Component({
  selector: 'app-alta-productos',
  templateUrl: './alta-productos.page.html',
  styleUrls: ['./alta-productos.page.scss'],
})
export class AltaProductosPage implements OnInit {

  myForm: FormGroup;
  image: string;
  producto:Producto;
  code: any;
  arrayFotos:Array<Imagen> = [];
  arrayInit=false;
  encodedData:string;

  // imagePickerOptions: ImagePickerOptions = {
  //   quality: 50,
  //   outputType: 1
  // };

  constructor(
    private comandaService: ComandaServiceService,
    private alertController: AlertController,
    private barcodeScanner: BarcodeScanner,
    private camera: Camera) { }

  ngOnInit() {
    this.myForm = new FormGroup({
      name: new FormControl('', Validators.required),
      descripcion: new FormControl('', Validators.required),
      tiempo: new FormControl('', Validators.required),
      precio: new FormControl('', Validators.required),
    });
  }

  /** funcion para tomar la foto con @ionic-native/camera/ngx */
  takePhoto() {
    const options: CameraOptions = {
      quality: 50,
      targetWidth: 400,
      targetHeight: 400,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.CAMERA,
      allowEdit: false,
      encodingType: this.camera.EncodingType.JPEG,
      correctOrientation: true,
    };
    this.camera.getPicture(options).then((imageData) => {
      if (imageData) {
        this.image = `data:image/jpeg;base64,${imageData}`;
        let ImageAux:Imagen = new Imagen(this.image);
        this.arrayFotos.push(ImageAux);
        this.arrayInit= true;
      }
    }, (err) => {
      this.presentAlert(err);
    });
  }
 

  save() {

    this.producto = new Producto(
      this.myForm.get('name').value,
      this.myForm.get('descripcion').value,
      this.myForm.get('tiempo').value,
      this.myForm.get('precio').value,
      JSON.stringify(this.arrayFotos)
    );

    if(this.arrayFotos.length != 3) 
    {
      console.log("Tienen que ser 3 fotos");
      this.presentAlert("El alta tiene que incluir 3 fotos");
    }
    else
    {
    this.comandaService.saveProductos(this.producto);
    this.alertconfirm("cargado con exito");
    this.encodedData = "Producto: " + this.producto.name + " Descripcion: "+ this.producto.descripcion + " Tiempo:" + 
                        this.producto.tiempo + " Precio: " + this.producto.precio;
    this.encodedText();
    }

  }
//#region alerts
  async presentAlert(err) {
    const alert = await this.alertController.create({
      header: 'Aviso',
      subHeader: 'Error',
      message: err,
      buttons: ['OK']
    });

    await alert.present();
  }
  async alertconfirm(err) {
    const alert = await this.alertController.create({
      header: 'Aviso',
      subHeader: 'Confirmacion',
      message: err,
      buttons: ['OK']
    });

    await alert.present();
  }
//#endregion

  cargarimagenPrueba(){
    let ImageAux:Imagen = new Imagen('https://cdn.tn.com.ar/sites/default/files/styles/1366x765/public/2018/10/15/comida-chatarra-abstinencia.jpg');
    this.arrayFotos.push(ImageAux);
    this.arrayInit= true;
    // console.log(this.arrayFotos);
    console.log(JSON.stringify(this.arrayFotos));
  }

  
  encodedText(){
    this.barcodeScanner.encode(this.barcodeScanner.Encode.TEXT_TYPE,this.encodedData).then((encodedData) => {
        console.log(encodedData);
        this.encodedData = encodedData;
    }, (err) => {
        console.log("Error occured : " + err);
    });                 
}

// elegirFoto() {
//   this.choosePhoto()
//     .then(imageData => {
//       if (imageData !== '' || imageData !== 'OK') {
//         for (let i = 0; i < imageData.length; i++) {
//           this.arrayFotos.push(imageData[i]);
//           this.arrayInit= true;
//         }
//       } else {
//         this.presentAlert("error al cargar la foto");
//       }
//     })
//     .catch(error => {
//       this.presentAlert('Error: No se han podido cargar las fotos. ' + error.message);
//     });
//   }

//   choosePhoto() {

//     return this.imagePicker.getPictures(this.imagePickerOptions)
//     .then(res => {
//       console.log(res);
//       return res;
//     })
//     .catch(error => {
//       console.error(error);
//       return error;
//     });
//   }

}