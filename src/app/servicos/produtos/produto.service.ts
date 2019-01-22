import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Produto } from '../../Classes/produto';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class ProdutoService {
  private baseUrl: string = 'http://localhost:8080/product/category/';
  private headers = new Headers({ 'Content-Type': 'application/json' });
  private options = new RequestOptions({ headers: this.headers });

  constructor(private _http: Http) { }

  getProdutos(nomeCategoria: String, idSessao:String) {

    return this._http.get(this.baseUrl + nomeCategoria+'/'+idSessao, this.options).map((response: Response) => response.json())
      .catch(this.errorHandler);
  }

  getDestaques(idSessao:String) {

    return this._http.get(this.baseUrl + 'destaques/'+idSessao, this.options).map((response: Response) => response.json()).catch(this.errorHandler);
  }


  errorHandler(error: Response) {

    return Observable.throw(error || "Server ERROR");
  }
}
