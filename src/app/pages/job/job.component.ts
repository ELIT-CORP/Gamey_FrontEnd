import {Component, Inject, OnInit, ViewEncapsulation} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Subject} from "rxjs";
import {Job} from "../../model/job";
import {FirestoreDataService} from "../../shared/firestore-data.service";
import {AuthService} from "../../auth/auth.service";
import {User} from "../../model/user";
import {Router} from "@angular/router";
import {NotificationsService} from "angular2-notifications";


@Component({
  selector: 'job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class JobModal implements OnInit {

  private _unsubscribeAll: Subject<any>;
  job:Job;
  user!:User;
  requirements: any[] = [];

  userSkills: any = [];

  setJobs = new Set<any>();

  updatedJobs:any[] = [];

  constructor(public dialogRef: MatDialogRef<JobModal>, @Inject(MAT_DIALOG_DATA) public data: any, private afs: FirestoreDataService, private authService: AuthService, private router: Router,
              private notifications: NotificationsService) {
    this._unsubscribeAll = new Subject();
    this.job = data.job;
  }

  ngOnInit(): void {
    this.user = this.authService.isLoggedIn();
    this.requirements = this.job.requirements;
    // this.hasRequirements();
  }

  async registerJob(){
    debugger;
    if (await this.afs.userHasJobs(this.user.uid)){
      await this.afs.getUserJobById(this.user.uid).then((data: any) => {
        this.updatedJobs = data.jobs;
      });
      if (!this.updatedJobs.includes(this.job.title)){
        this.updatedJobs.push(this.job.title);
        const model: any = {
          uid: this.user.uid,
          jobs: this.updatedJobs,
        }
        await this.afs.updateUserJobs(model);

        this.close();
        this.notifications.success(
          'Sucesso',
          'Cadastro feito com sucesso',
        )
        await this.router.navigate(['/profile']);
      } else {
        this.close();
        this.notifications.error(
          'Erro',
          "Você ja se cadastrou para essa vaga",
        )
        await this.router.navigate(['/profile']);
      }
    } else {
      this.setJobs.add(this.job.title);
      const model: any = {
        uid: this.user.uid,
        jobs: Array.from(this.setJobs),
      }
      await this.afs.addUserJobs(model)
      this.close();
      this.notifications.success(
        'Sucesso',
        'Cadastro feito com sucesso',
      )
      await this.router.navigate(['/profile']);
    }
  }

  close(): void {
    this.dialogRef.close();
  }

  async hasRequirements(): Promise<boolean>{
    // await this.afs.getUserSkillsByUid()
    // this.userSkills = await JSON.parse(localStorage.getItem('userData')!);

    // for (var i = 0; i < this.requirements.length; ++i) {
    //   if (this.requirements[i] !== this.userSkills[i]) return false;
    // }
    return true;
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.complete();
    this._unsubscribeAll.unsubscribe();
    this.dialogRef.close();
  }
}
