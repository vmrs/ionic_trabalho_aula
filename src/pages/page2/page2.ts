import { Component } from '@angular/core';

import { NavController, NavParams, ActionSheetController } from 'ionic-angular';

import { ShowTaskPage } from '../show-task/show-task';

import {AngularFire, FirebaseListObservable} from 'angularfire2';

@Component({
  selector: 'page-page2',
  templateUrl: 'page2.html'
})
export class Page2 {
  selectedItem: any;
  icons: string[];
  items: FirebaseListObservable<any>;
  showTaskPage = ShowTaskPage;
  showOnlyCompletedActives = true;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              public af: AngularFire, 
              public actionSheetCtrl: ActionSheetController) {

    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');

    // Let's populate this page with some filler content for funzies
    this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
    'american-football', 'boat', 'bluetooth', 'build'];

    this.queryTasks();
  }
  queryTasks() {
      if(this.showOnlyCompletedActives) {
        this.items =  this.af.database.list('/todos', {
                        query: {
                          orderByChild: 'completed',
                          equalTo: true
                        }
                      });
      } else {
        this.items =  this.af.database.list('/todos');
      }
  }

  itemTapped(event, item) {
    this.presentActionSheet(item);

    // // That's right, we're pushing to ourselves!
    // this.navCtrl.push(this.showTaskPage, {
    //   item: item
    // });
  }

  presentActionSheet(item) {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Ações',
      buttons: [
        {
          text: 'Marcar como feita',
          icon: 'archive',
          handler: () => {
            this.markAsCompleted(item);
          }
        },
        {
          text: 'Apagar',
          icon: 'trash',
          role: 'destructive',
          handler: () => {
            this.delete(item);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          icon: 'close',
          handler: () => {
          }
        }
      ]
    });
    actionSheet.present();
  }

  markAsCompleted(item) {
    this.items.update(item, {completed: true});
  }

  delete(item) {
    this.items.remove(item);
  }
}
