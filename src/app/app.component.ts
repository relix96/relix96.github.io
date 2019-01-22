import { Component } from '@angular/core';
import { CookieService} from 'angular2-cookie/services';
import {ContactosComponent} from './contactos/contactos.component';
import { Options } from 'selenium-webdriver/opera';
import { ClienteService } from './servicos/clientes/cliente.service';
import { Alert } from 'selenium-webdriver';
import { LoginComponent } from './login/login.component';
import { Router } from '@angular/router';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  private title = 'Take it';
  private idSessao:String;



  constructor(private _cookieService: CookieService, private _clienteService:ClienteService, private _router:Router) { }
  ngOnInit() {


  }
  apagarCookies(){
    console.log(this.idSessao);
    this._clienteService.deleteSessao(this.getCookies()).subscribe();
    this._cookieService.remove("cliente");

  }

  getCookies() {
    return (this._cookieService.get("cliente") != undefined ? this._cookieService.get("cliente") : "NONE");
  }

  setCookies(cookie:String){
    this._cookieService.put("cliente",cookie.toString());
  }

  goHome(){
    this._router.navigate(['']);
  }




}
