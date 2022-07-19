import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public logo = "/assets/images/logo.png";
  public vector = "/assets/images/vector.svg";
  public items: any = [{
    title: "Product",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. ",
    button: "Play"
  }, {
    title: "Service", description: "Veritatis\n" +
      "obcaecati enetur iure eius earum ut olestias architecto voluptate liquam\n" +
      "nihil, eveniet aliquid culpa officia aut!", button: "See Documentation"
  },{
    title: "Contact", description: "Quo neque error repudiandae fuga?", button: "Call us"
  }];

  selectedIndex = 0;

  @Input() indicators = true;
  @Input() autoSlide = true;
  @Input() slideInterval = 3000;

  constructor() {
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
}
