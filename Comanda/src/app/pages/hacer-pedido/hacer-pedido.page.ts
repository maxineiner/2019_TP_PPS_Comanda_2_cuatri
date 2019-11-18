import { Component, OnInit } from '@angular/core';
import { AuthService} from "../../services/auth.service";
import { Router } from "@angular/router";
import { AlertController } from '@ionic/angular';
import { GetProductosService } from 'src/app/services/get-productos.service';


@Component({
  selector: 'app-hacer-pedido',
  templateUrl: './hacer-pedido.page.html',
  styleUrls: ['./hacer-pedido.page.scss'],
})
export class HacerPedidoPage implements OnInit {

  constructor( private authService:AuthService,
    public router : Router,
    private alertController: AlertController,
    private getProductos:GetProductosService) { }
  arrayProductos = [];
  ngOnInit() {
    this.arrayProductos = [];
    this.verLista();
  }

  private async verLista() {
    console.log("esta en verLista");
    this.getProductos.getProductosBase().subscribe(async (productos) => {
      
      // this.arrayClientes
      this.arrayProductos = [];
      productos.forEach(producto => {
   
        if(producto.name != undefined)
        {
          this.arrayProductos.push(producto);
        }
        
      });
    
    });
    console.log(this.arrayProductos);
  }

}
