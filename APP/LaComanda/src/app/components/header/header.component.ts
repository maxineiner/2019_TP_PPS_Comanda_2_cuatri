import { Component, OnInit, Input } from '@angular/core';
//import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() titulo: String;
  @Input() backButton: Boolean;
  url: string;

  constructor(/*private authService: AuthService,*/ private router: Router) { 
    console.log(this.router.url);
    this.url = this.router.url;
  }

  ngOnInit() {}

  onLogout() {
    //this.authService.logout();
  }

}
