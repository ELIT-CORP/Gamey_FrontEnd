import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../../auth/auth.service";
import { Router } from "@angular/router";
import { NotificationsService } from "angular2-notifications";
import { FirestoreDataService } from "src/app/shared/firestore-data.service";
import { appendFile } from "fs";
import { User } from "src/app/model/user";
import { log } from "console";


@Component({
    selector: 'profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

    selectedDino: string = "/assets/character/dinoBlue.png";
    userInfo: any;
    userSkills: any = [];
    userJobs: any = [];
    loggedUser: any;
    editable: boolean = false;
    dinoBlue: string = "/assets/character/dinoBlue.png"; // rgb(77, 146, 188)
    dinoRed: string = "/assets/character/dinoRed.png"; // rgb(188, 77, 79)
    dinoYellow: string = "/assets/character/dinoYellow.png"; // rba(253, 199, 96)
    dinoGreen: string = "/assets/character/dinoGreen.png"; // rgb(159, 188, 77)
    form!: FormGroup;

    get f(): any { return this.form.controls; }

    constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router, private notifications: NotificationsService, private afs: FirestoreDataService) {
    }

    async ngOnInit(): Promise<void> {
        let skills = await JSON.parse(localStorage.getItem('validateSkills')!);
        if (skills != null && skills != undefined && skills.length > 0)
            this.router.navigate([`/training/${skills[0].name}`]);

        await this.getUser();
        this.createFormGroup();
    }

    createFormGroup(): void {
        this.form = this.formBuilder.group({
            name: ['', [Validators.required]],
            character: [''],
        });
    }
    goTo(endpoint: string): void {
        this.router.navigate([`/${endpoint}`]);
    }
    signOut(): void {
        this.authService.SignOut();
    }
    setEditable(){
        this.editable = !this.editable;
    }

    selectCharacter(dino: string) {
        this.selectedDino = dino;
    }
    async getUser() {
        await this.afs.getUserSkillsByUid();
        this.userSkills = await JSON.parse(localStorage.getItem('userData')!);
        this.loggedUser = await this.authService.isLoggedIn();
        await this.afs.getUserJobById(this.loggedUser.uid).then((job: any) =>{
            this.userJobs = job.jobs;
            console.log(this.userJobs);
        });
    }
    async updateUser(){
        await this.authService.updateUser(this.f.name.value, this.f.character.value);
        window.location.reload();
    }
}
