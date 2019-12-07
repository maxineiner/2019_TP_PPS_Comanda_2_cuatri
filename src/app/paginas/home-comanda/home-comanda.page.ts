import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-home-comanda',
  templateUrl: './home-comanda.page.html',
  styleUrls: ['./home-comanda.page.scss'],
})
export class HomeComandaPage implements OnInit {

  constructor(
    private route: Router,
    private platform:Platform   
  ) { }

  ngOnInit(

  ) {
  }

  Mover(lugar){
    this.route.navigate([lugar])
  }

}
