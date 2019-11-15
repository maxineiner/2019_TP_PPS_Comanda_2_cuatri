import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { reject } from 'q';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private AFauth: AngularFireAuth ) { }

  logIn(email:string, password:string){

    return new Promise((resolve, rejected) => {
      this.AFauth.auth.signInWithEmailAndPassword(email,password).then(user => {
        resolve(user);
      }).catch(err =>rejected(err));
    });
    
  }

  currentUserId() {
    return this.AFauth.auth.currentUser.uid;
  }

  currentUserEmail() {
    return this.AFauth.auth.currentUser.email;
  }
  
  logOut(){
    this.AFauth.auth.signOut();
  }

  createUserWithEmailAndPassword(email: string, password: string) {
    return new Promise((resolve, reject) => {
      this.AFauth.auth.createUserWithEmailAndPassword(email, password).then(data => {
        resolve(data);
      }).catch(err => reject(err));
    });    
  }

  registerUser(email: string, pass: string) {
    return new Promise((resolve, reject) => {
      this.AFauth.auth.createUserWithEmailAndPassword(email, pass)
        .then(userData => resolve(userData))
        .catch(err => reject(err));
    });
  }
}


