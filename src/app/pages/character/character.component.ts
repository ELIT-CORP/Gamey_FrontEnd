import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../../shared/auth.service";
import { Router } from "@angular/router";
import { NotificationsService } from "angular2-notifications";

@Component({
    selector: 'character.component',
    templateUrl: './character.component.html',
    styleUrls: ['./character.component.scss']
})
export class CharacterComponent implements OnInit {
    characterForm!: FormGroup;
    isLoading: boolean = false;
    dinoBlue: string = "/assets/character/dinoBlue.png"; // rgb(77, 146, 188)
    dinoRed: string = "/assets/character/dinoRed.png"; // rgb(188, 77, 79)
    dinoYellow: string = "/assets/character/dinoYellow.png"; // rba(253, 199, 96)
    dinoGreen: string = "/assets/character/dinoGreen.png"; // rgb(159, 188, 77)
    bgColor: string = "rgb(5,5,5)";
    selectedDino!: string;
    user: any;
    selectedCharacter!: string;

    get f(): any { return this.characterForm.controls; }

    get characterControl() {
        return this.characterForm.get('character') as FormControl;
    }
    constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router, private notifications: NotificationsService) {
    }

    ngOnInit(): void {
        this.createFormGroup();
    }
    selectCharacter(dino: string, color: string){
        this.selectedDino = dino;
        this.bgColor = color;
    }
    createFormGroup(): void {
        this.characterForm = this.formBuilder.group({
            character: ['', [Validators.required]],
            skills: [''],
        });
    }
    
}