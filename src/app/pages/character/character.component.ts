import {Component, ElementRef, Input, OnInit, ViewChild} from "@angular/core";
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../auth/auth.service";
import {Router} from "@angular/router";
import {NotificationsService} from "angular2-notifications";
import {FirestoreDataService} from "src/app/shared/firestore-data.service";
import {User} from "src/app/model/user";
import {MatCheckboxChange} from "@angular/material/checkbox";
import KeenSlider, {KeenSliderInstance} from "keen-slider";
import { Course } from "src/app/model/course";

@Component({
  selector: 'character.component',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.scss']
})
export class CharacterComponent implements OnInit {
  @ViewChild("sliderRef") sliderRef!: ElementRef<HTMLElement>;
  characterForm!: FormGroup;
  isLoading: boolean = false;
  dinoBlue: string = "/assets/character/dinoBlue.png"; // rgb(77, 146, 188)
  dinoRed: string = "/assets/character/dinoRed.png"; // rgb(188, 77, 79)
  dinoYellow: string = "/assets/character/dinoYellow.png"; // rba(253, 199, 96)
  dinoGreen: string = "/assets/character/dinoGreen.png"; // rgb(159, 188, 77)
  bgColor: string = "rgb(5,5,5)";
  selectedDino!: string;
  user: any;
  selectedCharacter!: string;
  arr: any[] = [];
  setSkills = new Set<any>();

  items: any = [{
    question: "Fico entediado quando realizo atividade que são repetitivas",
    answer: ['', '', ''],
  }, {
    question: "Para mim quanto mais colegas de trabalho eu tiver é melhor",
    answer: ['', '', ''],
  }, {
    question: "Sou rígido com o cumprimento dos prazos estabelecidos",
    answer: ['', '', ''],
  },{
    question: "É importante para mim estar em destaque em um grupo",
    answer: ['', '', ''],
  },{
    question: "Sou capaz de rever meu posicionamento sobre algo que acredito",
    answer: ['', '', ''],
  }, ];
  currentSlide: number = 0
  slider!: KeenSliderInstance;

  traits: any = ['Líder', 'Sociável', 'Carismático', 'Determinado', 'Extrovertido']

  selectedIndex = 0;

  answers: any[] = [];
  courses: any[] = []

  @Input() indicators = true;
  @Input() autoSlide = false;
  @Input() slideInterval = 10000;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router, private notifications: NotificationsService, private afs: FirestoreDataService) {
  }

  async ngOnInit() {
    this.user = this.authService.isLoggedIn();
    this.createFormGroup();
    await this.afs.getCourses().subscribe(data => {
      this.courses = data;
    })
    if (this.autoSlide) {
      this.autoSlideItems();
    }
    this.answers = Array(this.items.length).fill(-1);
  }

  autoSlideItems():void {
    setInterval(() => {
      this.onNextClick();
    }, this.slideInterval);
  }

  onNextClick():void {
    if (this.selectedIndex === (this.items.length - 1)) {
      this.selectedIndex = 0;
    } else {
      this.selectedIndex++;
    }
  }

  selectCharacter(dino: string, color: string) {
    this.selectedDino = dino;
    this.bgColor = color;
  }

  createFormGroup(): void {
    this.characterForm = this.formBuilder.group({
      character: ['', [Validators.required]]
    });
  }

  async updateUser() {
    this.isLoading = true;

    const model: User = {
      uid: this.user.uid,
      character: this.characterForm.value.character,
      skills: Array.from(this.setSkills),
      trait: this.traits.at(Math.floor(Math.random() * 5))
    }
    this.isLoading = false;
    await this.afs.addUser(model)
    await this.router.navigate(['/profile']);
  }

  toggleSkills(event: any) {
    let skill = {
      name: event.source.value.name,
      url: event.source.value.url
    }
    if (event.source.checked) 
      return this.setSkills.add(skill);
    return this.setSkills.delete(skill);
  }

  get f(): any {
    return this.characterForm.controls;
  }

  get characterControl() {
    return this.characterForm.get('character') as FormControl;
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.slider = new KeenSlider(this.sliderRef.nativeElement, {
        initial: this.currentSlide,
        slideChanged: (s) => {
          this.currentSlide = s.track.details.rel
        },
      })
    })
  }

  ngOnDestroy() {
    if (this.slider) this.slider.destroy()
  }

  addAnswers(event:any, index:number){
    this.answers[index] = event.value;
  }
}
