import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-delivery',
  templateUrl: './home-delivery.page.html',
  styleUrls: ['./home-delivery.page.scss'],
})
export class HomeDeliveryPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  Mover(lugar){
    this.router.navigate([lugar]);
  }

}
