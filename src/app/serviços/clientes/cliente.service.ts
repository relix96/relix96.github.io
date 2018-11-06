import { Injectable } from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import { CookieService} from 'angular2-cookie/services';
import { Cliente } from '../../Classes/cliente';
import { Morada } from '../../Classes/morada';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/Rx';
import { ok } from 'assert';

@Injectable()
export class ClienteService {

  private baseUrl:string='http://localhost:8080/user';
  private headers = new Headers({'Content-Type':'application/json'});
  private options = new RequestOptions({headers:this.headers});
  private cliente : Cliente;
  private morada : Morada;

  constructor(private _http:Http) { }

  getClienteByCookie(idSessao:String){

    return  this._http.post(this.baseUrl+'/findByCookie/'+idSessao,this.options).map((response:Response)=> response.json())
    .catch(this.errorHandler);
    
  }  
  
  getLogin(mail:String, password:String){
    return this._http.post(this.baseUrl+'/login/cliente/'+mail, password, this.options).map((response:Response)=> response.text())
    .catch(this.errorHandler);
    
  } 
  createCliente(cliente:Cliente){

    return  this._http.post(this.baseUrl+'/createUser',JSON.stringify(cliente), this.options).map((response:Response)=> response.text())
    .catch(this.errorHandler);
    
  }

  updateCliente(cliente:Cliente, idSessao:String){

    return  this._http.put(this.baseUrl+'/update/'+idSessao,JSON.stringify(cliente), this.options).map((response:Response)=> response.text())
    .catch(this.errorHandler);
  }

  deleteSessao(idSessao:String){

    return this._http.delete(this.baseUrl+'/apagarSessao/'+idSessao,this.options).map((response:Response)=>response.text())
      .catch(this.errorHandler);
  }

  errorHandler(error:Response){
      return Observable.throw(error.text() || "Erro no Servidor!!");
  }
}



