import { Component, ElementRef, Input, OnInit, ViewChild } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { NotificationsService } from "angular2-notifications";
import { AuthService } from "src/app/auth/auth.service";
import { Course } from "src/app/model/course";
import { FirestoreDataService } from "src/app/shared/firestore-data.service";
import KeenSlider, { KeenSliderInstance } from "keen-slider"
// import { SecurityService } from "src/app/shared/security.service";

@Component({
    selector: 'start-training',
    templateUrl: './start-training.component.html',
    styleUrls: ['./start-training.component.scss']
})
export class StartTrainingComponent implements OnInit {

    @ViewChild("sliderRef") sliderRef!: ElementRef<HTMLElement>;
    
    idCourse!: string;
    course!: Course | any;
    selectedIndex = 0;
    currentSlide: number = 0
    answers: number[] = [];
    slider!: KeenSliderInstance;
    dotHelper: Array<Number> = [];
    isLoading: boolean = false;

    @Input() indicators = false;
    @Input() autoSlide = false;
    @Input() slideInterval = 10000;

    constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router, private notifications: NotificationsService, private afs: FirestoreDataService, private activatedRoute: ActivatedRoute) {
    }
    
    ngOnInit(): void {
        this.idCourse = this.activatedRoute.snapshot.params['id'];
        this.getCourse(this.idCourse);
    };

    async getCourse(courseId: string) {
        await this.afs.getCourseById(courseId).then((data: any) => {
            this.course = data;
            this.answers = Array(this.course.questions.length).fill(-1);
        });
    }
    goTo(endpoint: string): void {
        this.router.navigate([`/${endpoint}`]);
    }

    autoSlideItems(): void {
        setInterval(() => {
            this.onNextClick();
        }, this.slideInterval);
    }

    selectItem(index: number): void {
        this.selectedIndex = index;
    }

    onNextClick(): void {
        if (this.selectedIndex === (this.course.questions.length - 1)) {
            this.selectedIndex = 0;
        } else {
            this.selectedIndex++;
        }
    }

    ngAfterViewInit() {
        setTimeout(() => {
            this.slider = new KeenSlider(this.sliderRef.nativeElement, {
                initial: this.currentSlide,
                slideChanged: (s) => {
                    this.currentSlide = s.track.details.rel
                },
            })
            this.dotHelper = [
                ...Array(this.slider.track.details.slides.length).keys(),
            ]
        })
    }

    ngOnDestroy() {
        if (this.slider) this.slider.destroy()
    }

    setAnswers(question: number, answer: number, correctAnswer: any) {
        if(answer == correctAnswer)
            this.answers[question] = 1;
        if(answer != correctAnswer) 
            this.answers[question] = 0;
    }
    async saveAnswer(){
        this.isLoading = true;
        let sum = this.answers.reduce((a, b) => a + b, 0)
        let score = this.answers.length/2 + 1;
        if(sum >= score)
            await this.success();
        if (sum < score)
            this.notifications.error('Que pena', 'Você não atingiu nota suficiente para ganhar um selo')

        this.isLoading = false;
        // this.router.navigate(['/profile']);
    }

    async success(){
        let skill = {
            name: this.course.name,
            url: this.course.url
        }
        await this.afs.addUserSkill(skill);
        this.notifications.success('Parabéns', 'Você conquistou seu selo')
    }
}