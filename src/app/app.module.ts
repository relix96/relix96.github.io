import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule} from '@angular/forms';
import { HttpModule} from '@angular/http';
import { CookieService } from 'angular2-cookie/services';
import { AppRoutingModule } from './/app-routing.module';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { SobreComponent } from './sobre/sobre.component';
import { EmentaComponent } from './ementa/ementa.component';
import { ContactosComponent } from './contactos/contactos.component';
import { ClienteService } from './servicos/clientes/cliente.service';
import { CategoriaService } from  './servicos/categorias/categoria.service';
import { ProdutoService } from './servicos/produtos/produto.service';
import { CarrinhoService} from './servicos/carrinhos/carrinho.service';
import { CategoriaDetalhesComponent } from './categoria-detalhes/categoria-detalhes.component';
import { LoginComponent } from './login/login.component';
import { RegistarComponent } from './registar/registar.component';
import { EmailValidatorDirective } from './email-validator.directive';
import { CarrinhoComponent } from './carrinho/carrinho.component';
import { PerfilComponent } from './perfil/perfil.component';
import { NgModelComponent } from './ng-model/ng-model.component';
import {NgModalService} from './servicos/ngModals/ng-modal.service';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SobreComponent,
    EmentaComponent,
    ContactosComponent,
    CategoriaDetalhesComponent,
    LoginComponent,
    RegistarComponent,
    EmailValidatorDirective,
    CarrinhoComponent,
    PerfilComponent,
    NgModelComponent

  ],
  entryComponents:[
    NgModelComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    FormsModule,
    NgbModule.forRoot(),
  ],

  providers: [ClienteService, CategoriaService, ProdutoService, CookieService, CarrinhoService, NgModalService],
  bootstrap: [AppComponent]
})
export class AppModule { }
