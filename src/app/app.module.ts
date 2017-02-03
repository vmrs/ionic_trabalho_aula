import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { Page1 } from '../pages/page1/page1';
import { Page2 } from '../pages/page2/page2';
import { ShowTaskPage } from '../pages/show-task/show-task';
import { LoginPage } from '../pages/login/login';

import { AngularFireModule } from 'angularfire2';
import { AuthService } from '../providers/auth-service';

import { CloudSettings, CloudModule } from '@ionic/cloud-angular';
 
export const firebaseConfig = {
  apiKey: "AIzaSyDBsHvTR0wYxf5V0b-C_JjoGErHJCEho8g",
  authDomain: "todo-5d8fc.firebaseapp.com",
  databaseURL: "https://todo-5d8fc.firebaseio.com",
  storageBucket: "todo-5d8fc.appspot.com",
  messagingSenderId: "901124139844"
};

const cloudSettings: CloudSettings = {
  'core': {
    'app_id': 'd9067871'
  },
  'push': {
    'sender_id': '901124139844',
    'pluginConfig': {
      'ios': {
        'badge': true,
        'sound': true
      },
      'android': {
        'iconColor': '#343434'
      }
    }
  }
};

@NgModule({
  declarations: [
    MyApp,
    Page1,
    Page2,
    ShowTaskPage,
    LoginPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    CloudModule.forRoot(cloudSettings)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Page1,
    Page2,
    ShowTaskPage,
    LoginPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, AuthService]
})
export class AppModule {}
