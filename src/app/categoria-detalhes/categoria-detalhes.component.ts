import { Component, OnInit } from '@angular/core';
import { Produto } from '../Classes/produto';
import { CompraLinha } from '../Classes/compra-linha';
import { ProdutoService } from '../servicos/produtos/produto.service';
import { CarrinhoService } from '../servicos/carrinhos/carrinho.service';
import { ActivatedRoute } from '@angular/router';
import { error } from 'selenium-webdriver';
import { CookieService } from 'angular2-cookie/services';
import { Location } from '@angular/common';
import { AppComponent } from '../app.component';
import { NgModelComponent } from '../ng-model/ng-model.component';
import { NgModalService } from '../servicos/ngModals/ng-modal.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-categoria-detalhes',
  templateUrl: './categoria-detalhes.component.html',
  styleUrls: ['./categoria-detalhes.component.css']
})
export class CategoriaDetalhesComponent implements OnInit {
  private produtos: Produto[];
  private compraLinha: CompraLinha[];
  private idSessao: String;
  private mensagem: String;

  constructor(private _carrinhoService: CarrinhoService, private _produtoService: ProdutoService, private route: ActivatedRoute,
    private location: Location, private _cookieService: CookieService, private _appComponent: AppComponent,
    private modalService: NgbModal, private _ngModalService: NgModalService) { }

  ngOnInit() {
    console.log(this.route.snapshot.paramMap.get('id'));
    this.idSessao = (this._appComponent.getCookies() != null ? this._appComponent.getCookies() : "NONE");
    this.getProduct();
    this.compraLinha = [];

    console.log(this.idSessao);
  }

  getProduct() {
    this.idSessao = this._appComponent.getCookies();
    const nomeCategoria = this.route.snapshot.paramMap.get('id');
    console.log(nomeCategoria);
    this._produtoService.getProdutos(nomeCategoria, this.idSessao).subscribe((produtos) => {
      //  console.clear();

      produtos.forEach(produto => {

        let compraLinhaTemp = new CompraLinha();

        compraLinhaTemp.idProduto = produto.id;
        compraLinhaTemp.nomeProduto = produto.nomeProduto;
        compraLinhaTemp.preco = produto.preco;
        compraLinhaTemp.precoPack = produto.precoPack;
        compraLinhaTemp.porcao = produto.porcao;
        compraLinhaTemp.porcaoPack = produto.porcaoPack;
        compraLinhaTemp.quantidade = produto.quantidadeMinima;

        if (produto.precoPack == 0) {
          compraLinhaTemp.quantidadePack = 0;
        }
        else {
          compraLinhaTemp.quantidadePack = produto.quantidadeMinima;
        }
        compraLinhaTemp.quantidadeMinima = produto.quantidadeMinima;
        compraLinhaTemp.versao = produto.versao;
        compraLinhaTemp.descricao = produto.descricao;

        this.compraLinha.push(compraLinhaTemp);


      });
      console.log(this.compraLinha);
      this.produtos = produtos;
    }, (error) => {
      if (error == "A sua Sessão expirou. Por favor faça novamente login.") {
        this._ngModalService.showDefaultModalComponent(NgModelComponent, "Erro!", error.text());
        this._appComponent.apagarCookies();
        this._appComponent.goHome();
      }
      else
        this._ngModalService.showDefaultModalComponent(NgModelComponent, "Erro!", "Inicie sessão para adicionar o produto ao carrinho!");
    });
  }

  adicionar(compraLinha: CompraLinha) {
    console.log(compraLinha);
    if ((!Number(compraLinha.quantidade) && !Number(compraLinha.quantidadePack)) ||
      (Number(compraLinha.quantidade) && compraLinha.quantidade < compraLinha.quantidadeMinima) ||
      (Number(compraLinha.quantidadePack) && compraLinha.quantidadePack < compraLinha.quantidadeMinima)) {
        this._ngModalService.showDefaultModalComponent(NgModelComponent, "Erro!", " Quantidade Inválida!");
    }
    else {
      this._carrinhoService.adicionarCarrinho(this.idSessao, compraLinha).subscribe((linhas) => {
        this._ngModalService.showDefaultModalComponent(NgModelComponent, "Sucesso!", "Adicionou o produto ao carrinho!");
        console.log(linhas);

      }, (error) => {
        console.log();
        if (error == "A sua Sessão expirou. Por favor faça novamente login.") {
          this._ngModalService.showDefaultModalComponent(NgModelComponent, "Erro!", error.text());
          this._appComponent.apagarCookies();
          this._appComponent.goHome();
        }
        else
          this._ngModalService.showDefaultModalComponent(NgModelComponent, "Erro!", "Inicie sessão para adicionar o produto ao carrinho!");
      });
    }
  }
}
