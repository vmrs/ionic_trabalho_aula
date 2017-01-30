import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { Page1 } from '../pages/page1/page1';
import { Page2 } from '../pages/page2/page2';
import { ShowTaskPage } from '../pages/show-task/show-task';

import { AngularFireModule } from 'angularfire2';
 
export const firebaseConfig = {
  apiKey: "AIzaSyDBsHvTR0wYxf5V0b-C_JjoGErHJCEho8g",
  authDomain: "todo-5d8fc.firebaseapp.com",
  databaseURL: "https://todo-5d8fc.firebaseio.com",
  storageBucket: "todo-5d8fc.appspot.com",
  messagingSenderId: "901124139844"
};

@NgModule({
  declarations: [
    MyApp,
    Page1,
    Page2,
    ShowTaskPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Page1,
    Page2,
    ShowTaskPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
