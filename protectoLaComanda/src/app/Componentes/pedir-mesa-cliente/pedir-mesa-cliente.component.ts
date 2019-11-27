import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { ToastController } from '@ionic/angular';
import { MesaClienteService } from 'src/app/servicios/mesa-cliente.service';
import { LoginService } from 'src/app/servicios/login.service';
import { Entidad } from 'src/app/modals/entidad';

@Component({
  selector: 'app-pedir-mesa-cliente',
  templateUrl: './pedir-mesa-cliente.component.html',
  styleUrls: ['./pedir-mesa-cliente.component.scss'],
})
export class PedirMesaClienteComponent implements OnInit {

  usuario : any;
  paso1 : boolean;
  paso2 : boolean;
  paso3: boolean;
  paso4 : boolean;
  mesa : any;

  constructor(private barcodeScanner : BarcodeScanner,
    private toastController: ToastController,
    private mesaPedir : MesaClienteService,
    private login : LoginService)
    { 
      this.inicio();
    }

    async inicio()
    {
      this.login.traerDatosUsuario().subscribe(
        datos =>{
          this.usuario = datos['0'];
          if(this.usuario.mesa == 'habilitado')
          {
            this.paso1 = false;
            this.paso2 = false;
            this.paso3 = true;
            this.paso4 = false;
          }
          else if(this.usuario.mesa == 'pendiente')
          {
            this.paso1 = false;
            this.paso2 = true;
            this.paso3 = false;
            this.paso4 = false;
          }
          else if( this.usuario.mesa == 'ninguna')
          {
            this.paso1 = true;
            this.paso2 = false;
            this.paso3 = false;
            this.paso4 = false;
          }
          else
          {
            this.paso1 = false;
            this.paso2 = false;
            this.paso3 = false;
            this.paso4 = true;
          }
        }
      )
      this.paso1 = false;
      this.paso2 = false;
      this.paso3 = false;
      this.paso4 = false;
    }
  

  ngOnInit()
  {
    this.inicio();
    console.log("PEDIR MESA");
  }

  pedirMesaQR()
  {
    this.barcodeScanner.scan().then(barcodeData => {
      let datosBarcode = barcodeData.text;
      if(datosBarcode == "pendiente")
      {
        if(this.usuario.mesa = 'pendiente')
        {
          this.paso1 = false;
          this.paso2 = true;
        }
        else{
          this.usuario.mesa = "pendiente";
          this.mesaPedir.cambiarEstadoAPendiente(this.usuario);
          this.paso1 = false;
          this.paso2 = true;
        }
      }
      else
      {
        this.mensaje('Error! QR incorrecto');
      }
     }).catch(err => {
         console.log('Error', err);
     });
  }

  escanearMesaQR()
  {
    this.barcodeScanner.scan().then(
      barcodeData => 
      {
      try{
        let promesa = this.mesaPedir.traerMesaId(barcodeData.text).subscribe(
          mesa =>
          {
            console.log("mesa que traje " + mesa['0']);
            this.mesa = mesa['0'];
            if(mesa['0']['estado'] == "desocupado")
            {
              this.mesa.estado = 'ocupado';
              this.usuario.mesa = barcodeData.text;
              this.mesa.usuarioActual = this.login.correoUsuarioActual();
              console.log("mesa que voy a subir " + this.mesa);
              this.mesaPedir.cambiarEstadoMesaAOcupadoXUsuarioActual(this.mesa,this.usuario);
              promesa.unsubscribe();
            }
            else{
              this.mensaje("Error! esta mesa ya esta ocupada.");
              promesa.unsubscribe();
            }
        }
      )
    }
    catch(err) {
      this.mensaje("Error, esta mesa es invalida");
    }
    })
  }


  async mensaje(texto)
  {
    const toast = await this.toastController.create({
      message: texto,
      duration: 2500,
      position:"top",
      color : "light",
      buttons: [{
          text: 'x',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }]
    });
    toast.present();
  }
}
