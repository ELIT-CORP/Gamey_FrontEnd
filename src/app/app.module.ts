import { Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatNativeDateModule } from "@angular/material/core";
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatIconModule } from "@angular/material/icon";
import { AngularFireModule } from "@angular/fire/compat";
import { AngularFireAuthModule } from "@angular/fire/compat/auth";
import { AngularFireStorageModule } from "@angular/fire/compat/storage";
import { AngularFireDatabaseModule } from "@angular/fire/compat/database";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatButtonModule } from "@angular/material/button";
import { SimpleNotificationsModule } from "angular2-notifications";
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatStepperModule } from '@angular/material/stepper';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { AuthService } from './auth/auth.service';
import { AuthGuard } from './auth/auth-guard.service';
import { NoAuthGuard } from './auth/no-auth-guard.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { SignUpComponent } from './pages/signup/signup.component';
import { CharacterComponent } from './pages/character/character.component';
import { ProfileComponent } from './pages/profile/profile.component';

import { environment } from "../environments/environment";
import { LoginComponent } from './pages/login/login.component';
import {JobModal} from "./pages/job/job.component";
import {MatDialogModule} from "@angular/material/dialog";
import {JobAddModal} from "./pages/job/job-add.component";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SignUpComponent,
    CharacterComponent,
    ProfileComponent,
    LoginComponent,
    JobModal,
    JobAddModal
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatRadioModule,
    MatButtonToggleModule,
    MatNativeDateModule,
    MatIconModule,
    MatStepperModule,
    MatButtonModule,
    MatDialogModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    SimpleNotificationsModule.forRoot({timeOut: 3000,showProgressBar: true,pauseOnHover: true,clickToClose: false,clickIconToClose: true })
  ],
  providers: [{provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'fill'}}, AuthService, AuthGuard, NoAuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule {
  static injector: Injector;

  constructor(injector: Injector) {
    AppModule.injector = injector;
  }
}
