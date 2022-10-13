import {Component, Inject, OnInit, ViewEncapsulation} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Subject} from "rxjs";
import {Job} from "../../model/job";


@Component({
  selector: 'job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class JobModal implements OnInit {

  private _unsubscribeAll: Subject<any>;
  job:Job;

  constructor(public dialogRef: MatDialogRef<JobModal>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this._unsubscribeAll = new Subject();
    this.job = data.job;
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this._unsubscribeAll.complete();
    this._unsubscribeAll.unsubscribe();
    this.dialogRef.close();
  }
}
