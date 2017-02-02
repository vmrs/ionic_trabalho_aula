import { Injectable } from '@angular/core';
import { AuthProviders, AngularFireAuth, FirebaseAuthState, AuthMethods } from 'angularfire2';

@Injectable()
export class AuthService {
  private authState: FirebaseAuthState;

  constructor(public auth$: AngularFireAuth) {
    this.subscribe((state: FirebaseAuthState) => {
      this.authState = state;
      console.log(JSON.stringify(this.authState));
    });
  }

  subscribe(observer) {
    this.auth$.subscribe(observer);
  }

  get uid() {
    return this.authState.uid
  }

  get authenticated(): boolean {
    return this.authState != null;
  }

  signInWithPassword(user): firebase.Promise<FirebaseAuthState> {
    return this.auth$.login(user, {
        provider: AuthProviders.Password,
        method: AuthMethods.Password
    });
  }

  signUpWithPassword(user): firebase.Promise<FirebaseAuthState> {
    return this.auth$.createUser(user);
  }

  signOut(): void {
    this.auth$.logout();
  }
}
