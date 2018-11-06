import { Component, OnInit, Input } from '@angular/core';
import { Carrinho } from '../Classes/carrinho';
import { CarrinhoService } from '../serviços/carrinhos/carrinho.service';
import { CookieService } from 'angular2-cookie/services';
import { CompraLinha } from '../Classes/compra-linha';
import { AppComponent } from '../app.component';
import { NgModelComponent } from '../ng-model/ng-model.component';
import { NgModalService } from '../serviços/ngModals/ng-modal.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.component.html',
  styleUrls: ['./carrinho.component.css']
})
export class CarrinhoComponent implements OnInit {

  private carrinho = new Carrinho();
  private linhaCarrinho: CompraLinha[];
  private linhas: CompraLinha[];
  private idSessao: String;
  private mensagem: String

  constructor(private _carrinhoService: CarrinhoService, private _cookieService: CookieService,
    private _appComponent: AppComponent, private modalService: NgbModal, private _ngModalService: NgModalService) { }

  ngOnInit() {
    if (this._appComponent.getCookies() == "NONE") {
      this._appComponent.goHome();
    }
    this.linhaCarrinho = [];
    this.idSessao = this._appComponent.getCookies();
    console.log(this.idSessao);
    this.atualizarCarrinho();
  }

  atualizarCarrinho() {
    this.idSessao = this._appComponent.getCookies();
    this._carrinhoService.getCarrinho(this.idSessao).subscribe((carrinho) => {
      console.log(carrinho);
      this.linhas = carrinho.linhas;
      this.carrinho = carrinho;
    }, (error) => {
      this._ngModalService.showDefaultModalComponent(NgModelComponent, "Erro!", error.text());
      this._appComponent.apagarCookies();
      this._appComponent.goHome();
      console.log(error);
    })
  }

  remover(produto: CompraLinha) {
    this._ngModalService.showDefaultModalComponentWithCancelButton(NgModelComponent, "Atenção!", "Tem a certeza que pretende remover " + produto.nomeProduto + " do carrinho? ").result.then((result) => {
      this._carrinhoService.removerProduto(this.idSessao, produto).subscribe((carrinho) => {
        this._ngModalService.showDefaultModalComponent(NgModelComponent, "produto removido!", "Removeu o produto " + produto.nomeProduto + " do seu carrinho!");
        this.linhas = carrinho.linhas;
        this.carrinho = carrinho;
        console.log(this.carrinho);
      }, (error) => {
        this._ngModalService.showDefaultModalComponent(NgModelComponent, "Erro!", error.text());
        this._appComponent.apagarCookies();
        this._appComponent.goHome();
        console.log(error);
      })

    }
      , (reason) => {
        this.atualizarCarrinho();
      });

  }

  gravarLinha(linha: CompraLinha) {
    if ((!Number(linha.quantidade) && !Number(linha.quantidadePack)) ||
      (Number(linha.quantidade) && linha.quantidade < linha.quantidadeMinima) ||
      (Number(linha.quantidadePack) && linha.quantidadePack < linha.quantidadeMinima)) {

      this._ngModalService.showDefaultModalComponentWithCancelButton(NgModelComponent, "Atenção!", "Tem a certeza que pretende remover "
        + linha.nomeProduto + " do carrinho? ").result.then((result) => {
          this.remover(linha);
        }, (reason) => {
          console.log("cancel");
          this.atualizarCarrinho();
        });

    } else {
      this._carrinhoService.gravarLinha(this.idSessao, linha).subscribe((carrinho) => {
        this.linhas = carrinho.linhas;
        this.carrinho.linhas = this.linhas;
        this.carrinho = carrinho;
        console.log(this.carrinho);
      }, (error) => {
        this._ngModalService.showDefaultModalComponent(NgModelComponent, "Erro!", error.text());
        this._appComponent.apagarCookies();
        this._appComponent.goHome();
      });
    }
  }

  comprarCarrinho() {
    this._carrinhoService.comprarCarrinho(this.idSessao, this.carrinho).subscribe((carrinho) => {
      this._ngModalService.showDefaultModalComponent(NgModelComponent, "Sucesso!", "Concluiu a compra com sucesso!!");
      this.linhas = carrinho.linhas;
      this.carrinho = carrinho;
      console.error(carrinho);
    }, (error) => {
      this._ngModalService.showDefaultModalComponent(NgModelComponent, "Erro!", error.text());
      console.log(error);
    })
  }

}
