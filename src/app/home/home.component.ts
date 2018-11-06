import { Component, OnInit } from '@angular/core';
import { ProdutoService } from '../serviços/produtos/produto.service';
import { Produto } from '../Classes/produto';
import { AppComponent } from '../app.component';
import { CompraLinha } from '../Classes/compra-linha';
import { CategoriaDetalhesComponent } from '../categoria-detalhes/categoria-detalhes.component';
import { CarrinhoService } from '../serviços/carrinhos/carrinho.service';
import { NgModelComponent } from '../ng-model/ng-model.component';
import { NgModalService } from '../serviços/ngModals/ng-modal.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  private idSessao: String;
  private destaques: CompraLinha[];

  constructor(private _produtoService: ProdutoService, private _appComponent: AppComponent, private _carrinhoService: CarrinhoService, private modalService: NgbModal, private _ngModalService: NgModalService) { }

  ngOnInit() {
    this.destaques = [];
    this.getDestaques();
  }

  getDestaques() {
    this.idSessao = (this._appComponent.getCookies() != null ? this._appComponent.getCookies() : "NONE");
    console.log(this.idSessao);
    this._produtoService.getDestaques(this.idSessao).subscribe((destaques) => {
      destaques.forEach(produto => {

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

        this.destaques.push(compraLinhaTemp);
      }, (error) => {
        console.info(error);

      })
    })

  }


  adicionarDestaque(compraLinha: CompraLinha) {
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
        if (this.idSessao == "NONE") {
          this._ngModalService.showDefaultModalComponent(NgModelComponent, "Erro!", error.text());
          this._appComponent.apagarCookies();
          this._appComponent.goHome();
        }
        else
          alert("Inicie sessão para adicionar o produto ao carrinho!");
      });
    }
  }

}