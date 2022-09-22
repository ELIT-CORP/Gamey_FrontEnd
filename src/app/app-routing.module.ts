import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./pages/home/home.component";
import {SignUpComponent} from './pages/signup/signup.component';
import { LoginComponent } from "./pages/login/login.component";
import { SelectCharacter } from './pages/signup/select-character';
import { SelectSkills } from './pages/signup/select-skills';
import { ProfileComponent } from './pages/profile/profile.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'signup',
    component: SignUpComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'signup/select-character',
    component: SelectCharacter
  },
  {
    path: 'signup/select-skills',
    component: SelectSkills
  },
  {
    path: 'profile',
    component: ProfileComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
