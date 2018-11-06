import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { SobreComponent }from './sobre/sobre.component';
import { Routes, RouterModule } from '@angular/router';
import { EmentaComponent } from './ementa/ementa.component';
import { ContactosComponent } from './contactos/contactos.component';
import { CategoriaDetalhesComponent } from './categoria-detalhes/categoria-detalhes.component';
import { LoginComponent } from './login/login.component';
import { RegistarComponent } from './registar/registar.component';
import { CarrinhoComponent} from './carrinho/carrinho.component';
import { PerfilComponent } from './perfil/perfil.component';


const routes: Routes = [
  {
    path: '',
    component:HomeComponent
  },
  {
    path:'quem-somos-nos',
    component: SobreComponent 
  },
  {
    path:'ementa',
    component: EmentaComponent
  },
  {
    path:'contactos',
    component: ContactosComponent
  },
  {
    path:'categoria/:id',
    component: CategoriaDetalhesComponent
  },

  {
    path:'login',
    component: LoginComponent
  },
  {
    path:'registar',
    component: RegistarComponent
  },
  {
    path:'carrinho',
    component: CarrinhoComponent
  },
  {
    path:'perfil',
    component: PerfilComponent  
  },
  {
    path: '**',
    redirectTo: ''
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
