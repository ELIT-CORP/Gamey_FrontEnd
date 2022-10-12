import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./pages/home/home.component";
import {SignUpComponent} from './pages/signup/signup.component';
import { LoginComponent } from "./pages/login/login.component";
import { CharacterComponent } from './pages/character/character.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { AuthGuard } from './auth/auth-guard.service';
import { NotFoundComponent } from './pages/NotFound/not-found.component';
import { NoAuthGuard } from './auth/no-auth-guard.service';
import { AppModule } from './app.module';
import { JobList } from './pages/job/job-list.component';
import { AuthGuardCharacter } from './auth/auth-guard-character.service';
import { TrainingComponent } from './pages/training/training.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [NoAuthGuard],
  },
  {
    path: 'signup',
    component: SignUpComponent,
    canActivate: [NoAuthGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [NoAuthGuard],
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'training',
    component: TrainingComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'character',
    component: CharacterComponent,
    // canActivate: [AuthGuardCharacter],
  },
  {
    path: 'job',
    component: JobList,
    canActivate: [AuthGuard],
  },
  {
    path: '**',
    component: NotFoundComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
