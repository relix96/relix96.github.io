import { Injectable } from '@angular/core';
import {Http, Headers, RequestOptions, Response, Jsonp} from '@angular/http';
import { CompraLinha } from '../../Classes/compra-linha';
import {Carrinho} from '../../Classes/carrinho';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/Rx';
import { ok } from 'assert';
import { CarrinhoComponent } from '../../carrinho/carrinho.component';

@Injectable()
export class CarrinhoService {
  
  private baseUrl: string = 'http://localhost:8080/carrinho';
  private headers = new Headers({ 'Content-Type': 'application/json' });
  private options = new RequestOptions({ headers: this.headers });
  


  constructor(private _http: Http) { }

  comprarCarrinho(idSessao:String, carrinho:Carrinho){
    return this._http.post(this.baseUrl + '/comprarCarrinho/'+idSessao  ,JSON.stringify(carrinho), this.options).map((response: Response) => response.json())
    .catch(this.errorHandler);   
  }

  adicionarCarrinho(idSessao:String,linha:CompraLinha) {
    return this._http.post(this.baseUrl + '/adicionar/'+idSessao  ,JSON.stringify(linha), this.options).map((response: Response) => response.json())
      .catch(this.errorHandler);    
  }

  getCarrinho(idSessao:String) {

    return this._http.get(this.baseUrl + '/findCarrinho/'+idSessao, this.options).map((response: Response) => response.json())
      .catch(this.errorHandler);
    
  }  

  removerProduto(idSessao:String, linha:CompraLinha){ 
    return this._http.delete(this.baseUrl+'/remover/'+idSessao+'/'+linha.idProduto, this.options).map((Response:Response)=> Response.json())
    .catch(this.errorHandler)
  }
  
  gravarLinha(idSessao:String, linha:CompraLinha){
    console.log(linha);
    return this._http.put(this.baseUrl+'/gravarLinha/'+idSessao,JSON.stringify(linha), this.options).map((response: Response) => response.json())
    .catch(this.errorHandler);
  }


  errorHandler(error: Response) {

    return Observable.throw(error || "Server ERROR");
  }

}
