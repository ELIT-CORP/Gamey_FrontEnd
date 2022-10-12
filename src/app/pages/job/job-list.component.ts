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
import {AngularFirestore, DocumentChangeAction} from "@angular/fire/compat/firestore";


@Component({
  selector: 'job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.scss']
})
export class JobList implements OnInit {

  jobs!: any[];

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router, private notifications: NotificationsService, private matDialog: MatDialog, private firestoreDataService: FirestoreDataService, private _afs: AngularFirestore) {
  }

  async ngOnInit() {
    await this.firestoreDataService.getJobs().subscribe(jobs => {
      this.jobs = jobs
    });
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
