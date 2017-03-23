import { Component, Inject } from '@angular/core';
import { ViewController, NavController, NavParams } from 'ionic-angular';
import { FirebaseApp } from 'angularfire2';
import { AuthService } from '../../providers/auth-service';

/*
  Generated class for the ShowTask page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-show-task',
  templateUrl: 'show-task.html'
})
export class ShowTaskPage {
  item: any;
  image: string;
  firebase: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
               public auth: AuthService,
               @Inject(FirebaseApp) firebaseApp: any,
               public viewCtrl: ViewController) {

      this.firebase = firebaseApp;
      
      this.item = this.navParams.get("item");
      this.firebase.storage().ref().child(this.auth.uid+"/"+this.item.$key)
      .getDownloadURL()
      .then(url => {
        this.image = url;
      }).catch((err) => console.log(err));
  }

  close() {
    this.viewCtrl.dismiss();
  }

  closeAndMarkAsCompleted() {
    this.viewCtrl.dismiss({markAsCompleted: true});
  }

}
