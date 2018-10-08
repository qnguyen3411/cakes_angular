import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private _http: HttpClient){}

  getCakes() {
    return this._http.get('/cakes');
  }

  submitCake(data) {
    return this._http.post('/cakes', data)
  }

  submitReview(cakeId: string, data:Object) {
    return this._http.post(`/cakes/${cakeId}`, data)
  }
  
}
