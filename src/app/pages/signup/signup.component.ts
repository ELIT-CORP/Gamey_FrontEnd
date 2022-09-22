import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../shared/auth/auth.service";
import {Router} from "@angular/router";
import {NotificationsService} from "angular2-notifications";

const passwordPattern = "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*]).{8,}$";

@Component({
  selector: 'signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignUpComponent implements OnInit {
  form!: FormGroup;
  isLoading: boolean = false;

  get usernameControl() {
    return this.form.get('username') as FormControl;
  }

  get emailControl() {
    return this.form.get('email') as FormControl;
  }

  get passwordControl() {
    return this.form.get('password') as FormControl;
  }

  get confirmPasswordControl() {
    return this.form.get('conpassword') as FormControl;
  }

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router, private notifications: NotificationsService) {
  }

  ngOnInit(): void {
    localStorage.removeItem('tempUserData');
    this.createFormGroup();
  }

  createFormGroup(): void {
    this.form = this.formBuilder.group({
      // Validators.pattern(passwordPattern)
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      conpassword: ['', [Validators.required, Validators.minLength(8)]],
    }, {
      validators:this.MustMatch('password', 'conpassword')
    });
  }

  MustMatch(password:any, conpassword:any) {
    return (formGroup: FormGroup) => {
      const passwordcontrol = formGroup.controls[password];
      const conpasswordcontrol = formGroup.controls[conpassword];

      if (conpasswordcontrol.errors && !conpasswordcontrol.errors['MustMatch']) {
        return;
      }

      if (passwordcontrol.value !== conpasswordcontrol.value) {
        conpasswordcontrol.setErrors({MustMatch:true});
      } else {
        conpasswordcontrol.setErrors(null);
      }
    }
  }

  selectCharacter(): void {
    const model = {
      username: this.usernameControl.value,
      email: this.emailControl.value,
      password: this.passwordControl.value
    }
    localStorage.setItem('tempUserData', JSON.stringify(model));
    this.router.navigate([`/signup/select-character`]);
  }
}
