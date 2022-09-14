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
    type: string = "png";

    constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router, private notifications: NotificationsService) {
    }

    ngOnInit(): void {
        this.createFormGroup();
    }
    createFormGroup(): void {
        this.form = this.formBuilder.group({
            softSkill: ['', [Validators.required]],
            hardSkill: ['', [Validators.required]],
        });
    }
    register() {
        this.router.navigate([`/game`]);
    }

}