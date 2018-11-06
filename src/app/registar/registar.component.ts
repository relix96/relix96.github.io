import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ClienteService } from '../serviços/clientes/cliente.service';
import { CookieService } from 'angular2-cookie/services';
import { Cliente } from '../Classes/cliente';
import { Morada } from '../Classes/morada';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';
import {NgModelComponent} from '../ng-model/ng-model.component';
import {NgModalService} from '../serviços/ngModals/ng-modal.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-registar',
  templateUrl: './registar.component.html',
  styleUrls: ['./registar.component.css'],
})
export class RegistarComponent implements OnInit {

  private cliente: Cliente;
  private morada: Morada;
  private idUser: Number;
  private mensagem: String;
  private cookie: String;

  constructor(private _clienteService: ClienteService, private _router: Router, private _cookieService: CookieService,
    private _appComponent:AppComponent, private modalService: NgbModal, private _ngModalService:NgModalService) { }

  ngOnInit() {
    if (this._appComponent.getCookies() != "NONE") {
      this._appComponent.goHome();
    }
    else{
    this.cliente = new Cliente();
    this.morada = new Morada();
    this.cliente.morada = this.morada;
  }

  }

  registarCliente(cliente:Cliente, confirmPass:String) {   
    this._clienteService.createCliente(this.cliente).subscribe((idSessao) => {
      if(confirmPass != cliente.password){        
        this._ngModalService.showDefaultModalComponent(NgModelComponent,"Erro!"," As passwords não são iguais!" );
      }
      else{
      this._appComponent.setCookies(idSessao);
      this._appComponent.goHome();
      }
    }, (error) => {
      if(confirmPass != cliente.password){        
        this._ngModalService.showDefaultModalComponent(NgModelComponent,"Erro!"," As passwords não são iguais!");
       }
       else{
        this._ngModalService.showDefaultModalComponent(NgModelComponent,"Erro!",error);
       }
    });
  }
  mostrarMensagem() {
    return this.mensagem;
  }

}
