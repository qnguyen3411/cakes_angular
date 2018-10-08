import { Input, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cake',
  templateUrl: './cake.component.html',
  styleUrls: [
    './cake.component.css',
    '../app.component.css']
})
export class CakeComponent implements OnInit {
  @Input() cakeToShow: any;
  constructor() { }

  ngOnInit() {
  }

  avgRating() {
    const reviews = this.cakeToShow['reviews'] as Array<Object>;
    if (!reviews.length) {
      return 0;
    }
    return (reviews.reduce((sum, curr) => sum + curr['rating'], 0) / reviews.length).toFixed(2);
  }
}
