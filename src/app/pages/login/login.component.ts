import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../auth/auth.service";
import {Router} from "@angular/router";
import {NotificationsService} from "angular2-notifications";
import { FirestoreDataService } from "src/app/shared/firestore-data.service";

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  isLoading: boolean = false;
  emailValid: boolean = false;

  get emailControl() {
    return this.form.get('email') as FormControl;
  }

  get passwordControl() {
    return this.form.get('password') as FormControl;
  }

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router, private notifications: NotificationsService, private afs: FirestoreDataService) {
  }

  ngOnInit(): void {
    this.createFormGroup();
  }

  createFormGroup(): void {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  login(): void {
    this.isLoading = true;
    this.authService.SignIn(this.emailControl.value,this.passwordControl.value).then((r: any) => {
      if (r != null && typeof r != 'string') {
        if (!this.afs.getUserByUid(r.user.uid))
          this.router.navigate(['/profile'])
        else
          this.router.navigate([`/character`]);
      }
      this.isLoading = false;
    })
  }
  goFoward() {
    if (this.emailControl.status === "VALID")
      this.emailValid = true;
  }
}
