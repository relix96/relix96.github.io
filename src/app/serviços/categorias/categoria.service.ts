import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Categoria } from '../../Classes/categoria';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class CategoriaService {
  private baseUrl: string = 'http://localhost:8080/category';
  private headers = new Headers({ 'Content-Type': 'application/json' });
  private options = new RequestOptions({ headers: this.headers });
  

  constructor(private _http: Http) { }

  getCategorias(idSessao:String) {
    console.log(idSessao);
    return this._http.get(this.baseUrl + '/findAll/'+(idSessao!=null?idSessao:""), this.options).map((response: Response) => response.json())
      .catch(this.errorHandler);
    
  }   

  errorHandler(error: Response) {

    return Observable.throw(error || "Server ERROR");
  }

}

