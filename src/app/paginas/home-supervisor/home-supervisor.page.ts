import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-supervisor',
  templateUrl: './home-supervisor.page.html',
  styleUrls: ['./home-supervisor.page.scss'],
})
export class HomeSupervisorPage implements OnInit {

  constructor(private platform: Platform, private route:Router) { }

  ngOnInit() {
  }

  Mover(endpoint){
    this.route.navigate([endpoint])
  }

}
