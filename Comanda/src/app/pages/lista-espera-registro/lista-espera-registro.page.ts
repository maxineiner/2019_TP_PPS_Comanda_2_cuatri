import { Component, OnInit } from '@angular/core';
import {ListaEsperaService } from 'src/app/services/lista-espera.service'
import { async } from 'q';
import { Cliente } from 'src/app/model/cliente';
import { AuthService} from "../../services/auth.service";
import { Router } from "@angular/router";
import { AlertController } from '@ionic/angular';
import { ComandaServiceService } from 'src/app/services/comanda-service.service';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

@Component({
  selector: 'app-lista-espera-registro',
  templateUrl: './lista-espera-registro.page.html',
  styleUrls: ['./lista-espera-registro.page.scss'],
})
export class ListaEsperaRegistroPage implements OnInit {

  constructor( private listaEsperaService:ListaEsperaService,
    private authService:AuthService,
    public router : Router,
    private alertController: AlertController,
    private comandaService: ComandaServiceService,
    private socialSharing: SocialSharing) { }

  ngOnInit() {
    this.arrayClientes = [];
    this.verLista();

  }
  msjError:string;

  arrayClientes = [];
  private async verLista() {
    console.log("esta en verLista");
    this.listaEsperaService.getClientsToWaitingList().subscribe(async (clientes) => {
      
      // this.arrayClientes
      this.arrayClientes = [];
      clientes.forEach(cliente => {
   
        if(cliente.estado == "ESPERA")
        {
          this.arrayClientes.push(cliente);
        }
        
      });
    
    });
    console.log(this.arrayClientes);
  }

  async aceptar(item:Cliente) {
    console.log(item);
      console.log(item.email);
      console.log(item.password);
      try{
        let retorno = await this.authService.registerUser(item.email,item.password);
      let rol = this.comandaService.saveRol(retorno['user']['uid'],item.type);
      this.presentAlert("Cargado con exito");
      this.enviarMailSucces(item);
      this.listaEsperaService.removeClienteWaitingList(item);
      }
     catch (error) {
      this.presentAlert(error.message);
    }
      
        

  }
  rechazar(item:Cliente) { 

    console.log(this.arrayClientes);
    this.listaEsperaService.removeClienteWaitingList(item);
    console.log(this.arrayClientes);
    this.enviarMailFail(item);

    //  let pos = this.arrayClientes.indexOf(item);
    //  this.arrayClientes.splice(pos,1);
    //  console.log(pos);

  }


  async presentAlert(err) {
    const alert = await this.alertController.create({
      header: 'Aviso',
      subHeader: '',
      message: err,
      buttons: ['OK']
    });

    await alert.present();
  }

  enviarMailSucces(cliente:Cliente) {
    this.socialSharing.canShareViaEmail().then(() => {
      // Sharing via email is possible
    }).catch((e) => {
      console.log(e);
      // Sharing via email is not possible
    });
    this.socialSharing.shareViaEmail('su solicitud fue evaluda y ya puede ingresar con exito a la aplicacion como cliente! Buen provecho!', 'Solicitud generar cuenta en Restaurant "COMANDA"', [cliente.email]).then(() => {
      console.log( "Success!");
    }).catch((e) => {
      console.log( "Not Succes!");
      console.log(e);
      // Error!
    });
    
 
      }
      enviarMailFail(cliente:Cliente) {
        this.socialSharing.canShareViaEmail().then(() => {
          // Sharing via email is possible
        }).catch((e) => {
          console.log(e);
          // Sharing via email is not possible
        });
        this.socialSharing.shareViaEmail('su solicitud fue evaluda y lamanteblemente no comple los requisitos para sr nuestro cliente', 'Solicitud generar cuenta en Restaurant "COMANDA"', [cliente.email]).then(() => {
          console.log( "Success!");
        }).catch((e) => {
          console.log( "Not Succes!");
          console.log(e);
          // Error!
        });
        
     
          }

}
