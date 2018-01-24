import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
//import { Observable } from 'rxjs/Observable';

/*
  Generated class for the ApiFoliaProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ApiFoliaProvider {

  private baseApiPath = "https://rioinformaweb.azurewebsites.net/api";
  constructor(public http: Http) {
    console.log('Hello ApiFoliaProvider Provider');
  }

  getTodosBlocos(){
    return this.http.get(this.baseApiPath+"/Eventos");
  }

}
