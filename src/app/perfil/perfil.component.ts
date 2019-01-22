import { Component, OnInit, Input } from '@angular/core';
import { ClienteService } from '../servicos/clientes/cliente.service';
import { CookieService } from 'angular2-cookie/services';
import { Cliente } from '../Classes/cliente';
import { AppComponent } from '../app.component';
import { Morada } from '../Classes/morada';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import {NgModelComponent} from '../ng-model/ng-model.component';
import {NgModalService} from '../servicos/ngModals/ng-modal.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  private cliente: Cliente;
  private mensagem: String;
  private cookie: String;

  constructor(private _clienteService: ClienteService, private _router: Router, private _appComponent: AppComponent,
    private modalService: NgbModal, private _ngModalService:NgModalService) { }


  ngOnInit() {
    this.cookie = this._appComponent.getCookies();
    if (this._appComponent.getCookies() == "NONE") {
      this._appComponent.goHome();
    }
    this.getClienteByCookie(this.cookie);



  }
  updateCliente() {
    this._clienteService.updateCliente(this.cliente, this.cookie).subscribe((cliente) => {
      this._ngModalService.showDefaultModalComponent(NgModelComponent, "Sucesso!",cliente);
      this.mensagem = cliente;
    }, (error) => {
      this._ngModalService.showDefaultModalComponent(NgModelComponent,"Erro!",error);
      this._appComponent.apagarCookies();
      this._appComponent.goHome();

    });
  }
  getClienteByCookie(cookie: String) {
    this._clienteService.getClienteByCookie(this.cookie).subscribe((cliente) => {
      this.cliente = cliente;
    }, (error) => {
      this._ngModalService.showDefaultModalComponent(NgModelComponent,"Erro!",error);
      this._appComponent.apagarCookies();
      this._appComponent.goHome();
    });
  }


  mostrarMensagem() {
    return this.mensagem;
  }

}
