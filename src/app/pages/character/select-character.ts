import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../../shared/auth.service";
import { Router } from "@angular/router";
import { NotificationsService } from "angular2-notifications";

@Component({
    selector: 'select-character',
    templateUrl: './select-character.html',
    styleUrls: ['./select-character.scss']
})
export class SelectCharacter implements OnInit {
    characterForm!: FormGroup;
    isLoading: boolean = false;
    dinoRed: string = "/assets/character/dinoRed.png";
    dinoBlue: string = "/assets/character/dinoBlue.png";
    dinoGreen: string = "/assets/character/dinoGreen.png";
    dinoYellow: string = "/assets/character/dinoYellow.png";
    user: any;

    selectedCharacter!: string;

    get f(): any { return this.characterForm.controls; }

    get characterControl() {
        return this.characterForm.get('character') as FormControl;
    }
    constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router, private notifications: NotificationsService) {
    }

    ngOnInit(): void {
        this.user = localStorage.getItem('tempUserData');
        this.user = JSON.parse(this.user);
        this.createFormGroup();
    }

    createFormGroup(): void {
        this.characterForm = this.formBuilder.group({
            character: ['', [Validators.required]],
        });
    }
    chooseSkills(){
        const model = {
            username: this.user.username,
            email: this.user.email,
            password: this.user.password,
            character: this.characterControl.value
        }

        localStorage.setItem('tempUserData', JSON.stringify(model));
        this.router.navigate([`/signup/select-skills`]);
    }
    
}