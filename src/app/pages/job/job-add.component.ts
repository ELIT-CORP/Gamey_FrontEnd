import {Component, Inject, OnInit, ViewEncapsulation} from "@angular/core";
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../auth/auth.service";
import {Router} from "@angular/router";
import {NotificationsService} from "angular2-notifications";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FirestoreDataService} from "../../shared/firestore-data.service";
import {User} from "../../model/user";
import {Job} from "../../model/job";


@Component({
  selector: 'job-add',
  templateUrl: './job-add.component.html',
  styleUrls: ['./job-add.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class JobAddModal implements OnInit {

  form!: FormGroup;

  constructor(private formBuilder: FormBuilder, public dialogRef: MatDialogRef<JobAddModal>, @Inject(MAT_DIALOG_DATA) public data: any, private firestoreDataService: FirestoreDataService) {

  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      title: ['', [Validators.required]],
      requirements: this.formBuilder.array([this.formBuilder.group({requirement:''})]),
      description: ['', [Validators.required]],
    })
  }

  get requirements() {
    return this.form.get('requirements') as FormArray;
  }

  addRequirements() {
    if (this.requirements.length < 8) {
      this.requirements.push(this.formBuilder.group({requirement: ''}));
    }
  }

  deleteSellingPoint(index: any) {
    this.requirements.removeAt(index);
  }

  saveJob() {
    const model: Job = {
      title: this.form.get('title')?.value,
      requirements: this.form.get('requirements')?.value,
      description: this.form.get('description')?.value,
    }

    // this.firestoreDataService.addJob(model).then(r => console.log(r))
  }

  get f() {
    return this.form.controls;
  }

  close(): void {
    this.dialogRef.close();
  }
}
