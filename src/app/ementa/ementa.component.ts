import { Component, OnInit } from '@angular/core';
import { CategoriaService } from '../servicos/categorias/categoria.service';
import { Categoria } from '../Classes/categoria';
import { error } from 'selenium-webdriver';
import { CookieService } from 'angular2-cookie/services';
import { AppComponent } from '../app.component';
import {NgModelComponent} from '../ng-model/ng-model.component';
import {NgModalService} from '../servicos/ngModals/ng-modal.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-ementa',
  templateUrl: './ementa.component.html',
  styleUrls: ['./ementa.component.css']
})
export class EmentaComponent implements OnInit {

   categorias:Categoria[];
   private idSessao:String;
   private mensagem:String;

  constructor(private _categoriaService:CategoriaService, private _cookieService:CookieService,
    private _appComponent:AppComponent,   private modalService: NgbModal, private _ngModalService:NgModalService) { }

  ngOnInit() {

    this.idSessao = (this._appComponent.getCookies() != null ? this._appComponent.getCookies() : "NONE");
    console.log(this.idSessao);
    this._categoriaService.getCategorias(this.idSessao).subscribe((categorias)=>{
      console.clear();
      console.log(categorias);
      this.categorias=categorias;
    },(error)=>{
      this._ngModalService.showDefaultModalComponent(NgModelComponent,"Erro!",error.text())
        this._appComponent.apagarCookies();
        this._appComponent.goHome();
    })
  }
}
