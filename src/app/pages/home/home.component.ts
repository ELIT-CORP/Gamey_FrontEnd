import {Component, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public logo = "/assets/images/logo.png";
  public vector = "/assets/images/vector.svg";
  public items: any = [{
    title: "O Jogo",
    description: "Avance na sua carreira de forma divertida e dinâmica! Veja as vagas disponíveis na masmorra:",
    button: "Jogar"
  }, {
    title: "Como Funciona",
    description: "Aplique para vagas e teste suas habilidades avançando de fases, de forma dinâmica e eficiente! Caso prefira, é possível trocar para um modelo tradicional de avaliação também!",
    button: "Ver Documentação"
  },{
    title: "Contato", 
    description: "Tem alguma dúvida ou sugestão?", 
    button: "Fale Conosco"
  }];

  selectedIndex = 0;

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
}
