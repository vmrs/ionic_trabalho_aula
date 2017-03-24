import { Component, Input, Inject} from '@angular/core';
import { FirebaseApp } from 'angularfire2';
import { AuthService } from '../providers/auth-service';

@Component({
  selector: 'app-show-task',
  templateUrl: 'show-task.component.html'
})
export class ShowTaskComponent {
  _item: any;

  firebase: any;
  image: string;
  constructor( public auth: AuthService,
               @Inject(FirebaseApp) firebaseApp: any) {
        this.firebase = firebaseApp;
  }

  ngOnInit() {
      this.firebase.storage().ref().child(this.auth.uid+"/"+this.item.$key)
      .getDownloadURL()
      .then(url => {
        this.image = url;
      }).catch((err) => console.log(err));
  }

  @Input()
  set item(item) {
    this._item = item;
  }

  get item() {
    return this._item;
  }

}


