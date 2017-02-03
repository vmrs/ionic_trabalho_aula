import { Component } from '@angular/core';

import { NavController, AlertController } from 'ionic-angular';

import {AngularFire, FirebaseListObservable} from 'angularfire2';

import { AuthService } from '../../providers/auth-service';


@Component({
  selector: 'page-page1',
  templateUrl: 'page1.html'
})
export class Page1 {

  txtTarefa: string;
  items: FirebaseListObservable<any>;
  size: number = 0;

  constructor(public navCtrsl: NavController, private alertCtrl: AlertController, af: AngularFire, private auth: AuthService) {
    this.items = af.database.list('/todos/'+this.auth.uid);
    this.items.subscribe(
      val => this.size = val.length
    )
  }

  salvarTarefa() : void {
    let alert = this.alertCtrl.create({
      title: 'Confirmar',
      message: this.txtTarefa,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
          }
        },
        {
          text: 'Salvar',
          handler: () => {
            this.salvar();
          }
        }
      ]
    });
    alert.present();
  }

  salvar() : void {
    // alert(this.items.length);
    this.items.push({
      note: this.txtTarefa
    });
    this.txtTarefa = "";
  }

}
