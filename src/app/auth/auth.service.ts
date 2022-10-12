import { Injectable, NgZone } from '@angular/core';
import * as auth from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { NotificationsService } from "angular2-notifications";
import { updateProfile } from 'firebase/auth';
import { AnyARecord } from 'dns';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userData: any; // Save logged in user data
  constructor(
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,
    public ngZone: NgZone,
    private notifications: NotificationsService
  ) {
    /* Saving user data in localstorage when
    logged in and setting up null when logged out */
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user')!);
      } else {
        localStorage.setItem('user', 'null');
        JSON.parse(localStorage.getItem('user')!);
      }
    });
  }

  // Sign in with email/password
  async SignIn(email: string, password: string) {
    try {
      return this.afAuth
        .signInWithEmailAndPassword(email, password)
        .then((userCred) => {
          this.userData = userCred.user;
          this.notifications.success(
            'Sucesso',
            'Login feito com sucesso',
          )
          this.afAuth.authState.subscribe((user) => {
            if (user) {
              this.router.navigate(['/character']);
            }
          });
        }).catch((error) => {
          this.notifications.error(
            'Erro ao logar',
            'Email e/ou senha invalido');
          console.error(error.message);
          // this.router.navigate([''])
        });
    } catch (error: any) {
      this.notifications.error(
        'Erro',
        error.message,
      )
      return error.message;;
    }
  }

  // Sign up with email/password
  SignUp(displayName: string, email: string, password: string): Promise<void> {
    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((userCred: any) => {
        updateProfile(userCred.user, { displayName })
        this.notifications.success(
          'Sucesso',
          'Cadastro feito com sucesso',
        )
        return userCred;
      })
      .catch((error) => {
        this.notifications.error(
          'Erro',
          error.message,
        )
        return error.message;
      });
  }
  // Send email verfificaiton when new user sign up
  // SendVerificationMail() {
  //   return this.afAuth.currentUser
  //     .then((u: any) => u.sendEmailVerification())
  //     .then(() => {
  //       this.router.navigate(['verify-email-address']);
  //     });
  // }

  // Reset Forggot password
  ForgotPassword(passwordResetEmail: string) {
    return this.afAuth
      .sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        window.alert('Password reset email sent, check your inbox.');
      })
      .catch((error) => {
        window.alert(error);
      });
  }

  // Returns true when user is looged in and email is verified
  isLoggedIn(): any {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user
  }

  errorMessage(message: string) {
    this.router.navigate(['/login']);
    this.notifications.error(
      'Erro',
      message,
    )
  }
  // Sign in with Google
  GoogleAuth() {
    return this.AuthLogin(new auth.GoogleAuthProvider()).then((res: any) => {
      if (res) {
        this.router.navigate(['']);
      }
    });
  }

  // Auth logic to run auth providers
  AuthLogin(provider: any) {
    return this.afAuth
      .signInWithPopup(provider)
      .then((result) => {
        this.ngZone.run(() => {
          this.router.navigate(['']);
        });
      })
      .catch((error) => {
        window.alert(error);
      });
  }

  // Sign out
  SignOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      localStorage.removeItem('userData');
      this.router.navigate(['login']);
    });
  }

  async updateProfileUrl(photoURL: any) {
    await updateProfile(this.userData, { photoURL: photoURL })
  }

  async updateDisplayName(displayName: any) {
    await updateProfile(this.userData, { displayName: displayName })
  }

  async updateUser(displayName: any, photoURL: any){
    if(displayName)
      this.updateDisplayName(displayName)
    if(photoURL)
      this.updateProfileUrl(photoURL)
  }
}
