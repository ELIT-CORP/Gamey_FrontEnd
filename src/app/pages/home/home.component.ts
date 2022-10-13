import { Component, ElementRef, Input, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import {Router} from "@angular/router";
import { FirestoreDataService } from 'src/app/shared/firestore-data.service';
import { User } from 'src/app/model/user';
import KeenSlider, { KeenSliderInstance } from "keen-slider"

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],

})
export class HomeComponent implements OnInit {
  @ViewChild("sliderRef") sliderRef!: ElementRef<HTMLElement>;
  public logo = "/assets/images/logo.png";
  public vector = "/assets/images/vector.svg";
  public items: any = [{
    title: "O Jogo",
    question: "Avance na sua carreira de forma divertida e dinâmica! Veja as vagas disponíveis na masmorra",
    button: "Jogar",
    background: "/assets/images/mountain.png"
  }, {
    title: "Como Funciona",
    question: "Aplique para vagas e teste suas habilidades avançando de fases, de forma dinâmica e eficiente! Caso prefira, é possível trocar para um modelo tradicional de avaliação também!",
    button: "Ver Documentação",
    background: "/assets/images/ruins.png"
  },{
    title: "Contato",
    question: "Tem alguma dúvida ou sugestão?",
    button: "Fale Conosco",
    background: "/assets/images/florest.png"
  }];

  currentSlide: number = 1
  slider!: KeenSliderInstance;
  dotHelper: Array<Number> = []

  selectedIndex = 0;
  arr: User[] = [];

  @Input() indicators = true;
  @Input() autoSlide = true;
  @Input() slideInterval = 10000;

  constructor(private router: Router) {

  }

  ngOnInit(): void {
    if (this.autoSlide) {
      this.autoSlideItems();
    }
  }

  autoSlideItems():void {
    setInterval(() => {
      this.onNextClick();
    }, this.slideInterval);
  }

  selectItem(index: number): void {
    this.selectedIndex = index;
  }

  onNextClick():void {
    if (this.selectedIndex === (this.items.length - 1)) {
      this.selectedIndex = 0;
    } else {
      this.selectedIndex++;
    }
  }

  goTo(endpoint: string): void {
    this.router.navigate([`/${endpoint}`]);
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
}
