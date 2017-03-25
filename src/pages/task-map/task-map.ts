import { Component } from '@angular/core';
import { ViewController, NavController, NavParams } from 'ionic-angular';
import { Geolocation } from 'ionic-native';

@Component({
  selector: 'page-task-map',
  templateUrl: 'task-map.html'
})
export class TaskMapPage {

  marker : {latitude, longitude} = {latitude: 0, longitude: 0};
  ionViewDidLoad(){
    
    Geolocation.getCurrentPosition().then(
      location => {
        this.marker = { 
            latitude: location.coords.latitude, 
            longitude: location.coords.longitude
        };
      }
    ).catch(err => alert("ERROR "+err.message));

  }

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public viewCtrl: ViewController) {}


  setMarker(evt) {
    this.marker.latitude = evt.coords.lat;
    this.marker.longitude = evt.coords.lng;
  }

  close() {
    this.viewCtrl.dismiss();
  }

  closeAndSendMarker() {
    this.viewCtrl.dismiss({marker: this.marker});
  }
}


