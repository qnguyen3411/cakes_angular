import { OnInit, Component } from '@angular/core';
import { HttpService } from './http.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'public';
  cakes: Cake[] = [];
  selectedCake: Cake;
  cakeToPost = {'baker': "", 'imgUrl':""}
  constructor(private _httpService: HttpService){}

  ngOnInit() {
    this.loadCakes();
  }

  loadCakes() {
    this._httpService.getCakes().subscribe(response => {
      if (response['status'] == "success") {
        this.cakes = (response['result'] as Array<Object>)
          .map(cakeData => new Cake(cakeData))
      }
    })
  }
  submitNewCake() {
    this._httpService.submitCake(this.cakeToPost)
    .subscribe(response => {
      if (response['status'] == "success") {
        this.loadCakes();
        this.cakeToPost = {'baker': "", 'imgUrl': ""};
      }
    })
  }

  submitNewReviewForCake(cake: Cake) {
    this._httpService.submitReview(cake.id, cake.newReview).subscribe(response =>{
      this.loadCakes();
      cake.reviews.push(cake.newReview)
      
      cake.newReview = {'rating': "1", 'content': ""};
    })
  }

  setSelectedCake(cake: Cake) {
    this.selectedCake = cake;
  }



}

class Cake {
  id: string;
  baker: string;
  imgUrl: string;
  reviews: Array<Object>
  newReview = {'rating': "1", 'content': ""};

  constructor(data: Object) {
    this.id = data['_id'];
    this.baker = data['baker'];
    this.imgUrl = data['imgUrl'];
    this.reviews = data['reviews'] as Array<Object>;
  }

}