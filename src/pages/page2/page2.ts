import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

import { SQLite } from 'ionic-native';
import { ShowTaskPage } from '../show-task/show-task';

@Component({
  selector: 'page-page2',
  templateUrl: 'page2.html'
})
export class Page2 {
  database: SQLite;
  selectedItem: any;
  icons: string[];
  items: Array<{title: string, note: string, fullNote: string, icon: string}>;
  showTaskPage = ShowTaskPage;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.database = new SQLite();
    this.database.openDatabase({name: "data.db", location: "default"}).then(() => {
        this.refreshData();
    }, (error) => {
        console.log("ERROR: ", error);
    });

    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');

    // Let's populate this page with some filler content for funzies
    this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
    'american-football', 'boat', 'bluetooth', 'build'];

    this.items = [];

  }
  
  refreshData() {
    this.database.executeSql("SELECT * FROM todos", []).then((data) => {
          if(data.rows.length > 0) {
              for(var i = 0; i < data.rows.length; i++) {
                this.items.push({
                  title: '#' + data.rows.item(i).id,
                  note: data.rows.item(i).todoText,//.substring(0, 15),
                  fullNote: data.rows.item(i).todoText,
                  icon: this.icons[Math.floor(Math.random() * this.icons.length)]
                });
              }
          }
      }, (error) => {
          console.log("ERROR: " + JSON.stringify(error));
      });
  }

  itemTapped(event, item) {
    // // That's right, we're pushing to ourselves!
    this.navCtrl.push(this.showTaskPage, {
      item: item
    });
  }
}
