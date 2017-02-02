import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import { Page1 } from '../page1/page1';

/*
  Generated class for the Login page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  
  user= { email: "", password: "" };

  constructor(public navCtrl: NavController, public navParams: NavParams, public auth: AuthService) {}

  registerUser() {
    this.auth.signUpWithPassword(this.user).then().catch((error) => {
      alert(error);
    });
  }


  login() {
    this.auth.signInWithPassword(this.user).then(
      (authData) => {
      alert(JSON.stringify(authData));
      this.navCtrl.setRoot(Page1);
    }
    ).catch((error) => {
      alert(error);
    });
  }
}
