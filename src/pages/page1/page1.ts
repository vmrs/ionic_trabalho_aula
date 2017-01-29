import { Component } from '@angular/core';

import { NavController, AlertController } from 'ionic-angular';

import { SQLite } from 'ionic-native';

@Component({
  selector: 'page-page1',
  templateUrl: 'page1.html'
})
export class Page1 {

  database: SQLite;
  txtTarefa: string;
  txtTarefas: string[] = [];

  constructor(public navCtrsl: NavController, private alertCtrl: AlertController) {
    this.database = new SQLite();
    this.database.openDatabase({name: "data.db", location: "default"}).then(() => {
        this.refreshData();
    }, (error) => {
        console.log("ERROR: ", error);
    });
  }

  refreshData() : void {
    this.database.executeSql("SELECT * FROM todos", []).then((data) => {
        this.txtTarefas = [];
        if(data.rows.length > 0) {
            for(var i = 0; i < data.rows.length; i++) {
                this.txtTarefas.push(data.rows.item(i).todoText);
            }
        }
    }, (error) => {
        console.log("ERROR: " + JSON.stringify(error));
    });
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
    this.database.executeSql("INSERT INTO todos (todoText) VALUES ('"+this.txtTarefa+"')", []).then((data) => {
        console.log("INSERTED: " + JSON.stringify(data));
        this.refreshData();
        this.txtTarefa = "";
    }, (error) => {
        console.log("ERROR: " + JSON.stringify(error.err));
    });
  }

}
