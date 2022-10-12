import { ContentObserver } from "@angular/cdk/observers";
import { Component, OnInit } from "@angular/core";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { FormBuilder } from "@angular/forms";
import { Router } from "@angular/router";
import { NotificationsService } from "angular2-notifications";
import { AuthService } from "src/app/auth/auth.service";
import { Course } from "src/app/model/course";
import { FirestoreDataService } from "src/app/shared/firestore-data.service";


@Component({
    selector: 'training',
    templateUrl: './training.component.html',
    styleUrls: ['./training.component.scss']
})
export class TrainingComponent implements OnInit {
    
    courses: Course[] = [];
    isLoading = false;
    constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router, private notifications: NotificationsService, private _afs: AngularFirestore) {
    }


    ngOnInit() {
        this.isLoading = true;
        this._afs.collection('Courses').valueChanges().subscribe((val: any) => this.courses = val);
        setTimeout(() => { 
            this.isLoading = false;
        }, 5000);
        
    }

    async getCourses(){
        // console.log(result);
    }
    goTo(endpoint: string): void {
        this.router.navigate([`/${endpoint}`]);
    }
}