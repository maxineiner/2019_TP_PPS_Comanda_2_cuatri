import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ComandaService } from 'src/app/servicios/comanda.service';
import { map } from 'rxjs/operators';
import { AlertController, ToastController } from '@ionic/angular';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Entidad } from 'src/app/modals/entidad';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.scss'],
})
export class ListaComponent implements OnInit {

  entidades : Observable<Entidad[]>;
  clientesPendientes = [];
  mostrar : boolean = true;
  constructor(private comandaServicio : ComandaService ,private alertController : AlertController,private toastController : ToastController,private statusBar : StatusBar) {
  }

  ngOnInit() {
    this.entidades = this.comandaServicio.traerEntidades().snapshotChanges().pipe(map(actions =>{
      return actions.map(a =>{
        const data = a.payload.doc.data() as Entidad;
        data.id = a.payload.doc.id;
        return data;

      })
    }));
    this.entidades.subscribe(data=>{
      this.clientesPendientes = [];
      data.forEach(element => {
         if(element.perfil == "cliente" && element.estado == "pendiente"){
          this.clientesPendientes.push(element);
         }
      })
      console.log("Clientes pendientes : " + this.clientesPendientes.length);
      if(this.clientesPendientes.length == 0){
        this.mostrar = false;
      }
      else{
        this.mostrar = true;
      }
    });
    
  }
  async cambiarEstado(estado : string,obj : Entidad) {
    let msj = "";
    let color = "";
    obj.estado = estado;
    if(estado == "rechazado"){
       msj = "Esta segruro de rechazar el ingreso de este cliente al restaurante?";
       color = "danger"
    }
    else if(estado == "aceptado"){
      msj = "Esta segruro de aceptar el ingreso de este cliente al restaurante?";
      color = "success";
    }
    
    const alert = await this.alertController.create({
      header: msj,
      buttons: [{
        text: 'Aceptar',
        cssClass: 'custom-alert-danger',
        handler: () => {
          console.log('Confirm acept');
          this.comandaServicio.actualizarClientes(obj)
          this.presentToastWithOptions(estado,color);
        }
      }, {
        text: 'Cancelar',
        handler: () => {
          console.log('Confirm cancel');
        }
      }]
    });

    await alert.present();
  }
  async presentToastWithOptions(estado : string,color : string) {
    let msj : string = "";
    if(estado == "aceptado"){
      msj = "Cliente aceptado :) .Se le ha enviado un correo indicando lo sucedido";
    }
    else if(estado == "rechazado"){
      msj = "Cliente rechazado :( .Se le ha enviado un correo indicando lo sucedido";
    }
    const toast = await this.toastController.create({
      message: msj,
      duration : 3000,
      color : color
    });
    toast.present();
  }


}
