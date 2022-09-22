import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../../shared/auth/auth.service";
import { Router } from "@angular/router";
import { NotificationsService } from "angular2-notifications";

@Component({
    selector: 'select-skills',
    templateUrl: './select-skills.html',
    styleUrls: ['./select-skills.scss']
})
export class SelectSkills implements OnInit {
    form!: FormGroup;
    isLoading: boolean = false;
    selectedDino: string = "/assets/character/dinoBlue.png";
    user: any;


    get hardSkillControl() {
        return this.form.get('hardSkill') as FormControl;
    }

    get softSkillControl() {
        return this.form.get('softSkill') as FormControl;
    }
    constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router, private notifications: NotificationsService) {
    }

    ngOnInit(): void {
        this.user = localStorage.getItem('tempUserData');
        this.user = JSON.parse(this.user);
        this.selectedDino = `/assets/character/${this.user.character}.png`
        this.createFormGroup();
    }
    createFormGroup(): void {
        this.form = this.formBuilder.group({
            softSkill: [''],
            hardSkill: [''],
        });
    }
    register() {
        this.authService.SignUp(this.user.email, this.user.password);
        this.router.navigate([`/profile`]);
        const model = {
            uid: JSON.parse(localStorage.getItem('user')!),
            username: this.user.username,
            email: this.user.email,
            character: this.user.character,
            hardSkill: this.hardSkillControl.value,
            softSkill: this.softSkillControl.value,
        }
        localStorage.setItem('userInfo', JSON.stringify(model));
    }

}