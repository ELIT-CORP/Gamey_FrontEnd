import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../../auth/auth.service";
import { Router } from "@angular/router";
import { NotificationsService } from "angular2-notifications";
import { userInfo } from "os";


@Component({
    selector: 'job-list',
    templateUrl: './job-list.component.html',
    styleUrls: ['./job-list.component.scss']
})
export class JobList implements OnInit {

    constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router, private notifications: NotificationsService) {
    }

    ngOnInit(): void {

    }

    goTo(endpoint: string): void {
        this.router.navigate([`/${endpoint}`]);
    }
}