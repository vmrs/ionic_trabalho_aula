import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

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
  constructor(public navCtrl: NavController, public navParams: NavParams) {
      this.item = this.navParams.get("item");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShowTaskPage');
  }

}
