import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../auth/auth.service";
import {Router} from "@angular/router";
import {NotificationsService} from "angular2-notifications";
import {userInfo} from "os";
import {JobModal} from "./job.component";
import {MatDialog} from "@angular/material/dialog";
import {JobAddModal} from "./job-add.component";
import {Job} from "../../model/job";
import {FirestoreDataService} from "../../shared/firestore-data.service";
import {Observable} from "rxjs";
import {DocumentChangeAction} from "@angular/fire/compat/firestore";


@Component({
  selector: 'job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.scss']
})
export class JobList implements OnInit {

  jobs: any[] = [];

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router, private notifications: NotificationsService, private matDialog: MatDialog, private firestoreDataService: FirestoreDataService) {
  }

  ngOnInit(): void {
    this.getJobs();

  }

  getJobs() {
    this.firestoreDataService.getJob().subscribe(res => {
      this.jobs = res.map(e => {
        const data: any = e.payload.doc.data()
        data.id = e.payload.doc.id
        return data;
      })
    })
    console.log(this.jobs)
  }

  goTo(endpoint: string): void {
    this.router.navigate([`/${endpoint}`]);
  }

  openJob(job: any) {
    this.matDialog.open(JobModal, {
      width: '600px', height: '800px', id: 'job-modal', data: {job: job}
    });
  }

  // addJob() {
  //   this.matDialog.open(JobAddModal, {
  //     width: '900px',
  //   });
  // }
}
