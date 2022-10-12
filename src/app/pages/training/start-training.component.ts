import { Component, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { NotificationsService } from "angular2-notifications";
import { AuthService } from "src/app/auth/auth.service";
import { FirestoreDataService } from "src/app/shared/firestore-data.service";
// import { SecurityService } from "src/app/shared/security.service";

@Component({
    selector: 'start-training',
    templateUrl: './start-training.component.html',
    styleUrls: ['./start-training.component.scss']
})
export class StartTrainingComponent implements OnInit {

    idCourse!: string;

    constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router, private notifications: NotificationsService, private afs: FirestoreDataService, private activatedRoute: ActivatedRoute) {
    }
    
    ngOnInit(): void {
        this.idCourse = this.activatedRoute.snapshot.params['id'];
        this.idCourse = this.idCourse.replace('-', ' ');
        console.log(this.idCourse);
    }

    goTo(endpoint: string): void {
        this.router.navigate([`/${endpoint}`]);
    }

}