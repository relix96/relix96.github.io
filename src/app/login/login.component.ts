  import { Component, OnInit } from '@angular/core';
  import { Cliente } from '../Classes/cliente';
  import { ClienteService } from '../servicos/clientes/cliente.service';
  import { CookieService } from 'angular2-cookie/services';
  import { error } from 'util';
  import { AppComponent } from '../app.component';
  import { NgModelComponent } from '../ng-model/ng-model.component';
  import { NgModalService } from '../servicos/ngModals/ng-modal.service';
  import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

  @Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
  })
  export class LoginComponent implements OnInit {

    private cliente: Cliente;
    private mensagem: String;
    private cookie: String;
    constructor(private _clienteService: ClienteService, private _cookieService: CookieService,
      private _appComponent: AppComponent, private modalService: NgbModal, private _ngModalService: NgModalService) { }

    ngOnInit() {
      this.cliente = new Cliente();
      if (this._appComponent.getCookies() != "NONE") {
        this._appComponent.goHome();
      }
    }

    login() {
      if (this.cliente.mail == null || this.cliente.password == null) {
        this._ngModalService.showDefaultModalComponent(NgModelComponent, "Erro!", "Por favor insira os dados!");
      }
      else {
        console.log("teste");
        this._clienteService.getLogin(this.cliente.mail, this.cliente.password).subscribe((idSessao) => {
          this._appComponent.setCookies(idSessao);
          console.log(idSessao);
          this._appComponent.goHome();
        }, (error) => {
          this._ngModalService.showDefaultModalComponent(NgModelComponent, "Erro!", error);
          console.log(error);
      });
    }
  }
}
