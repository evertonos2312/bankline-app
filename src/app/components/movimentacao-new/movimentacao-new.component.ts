import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CorrentistaService } from 'src/app/services/correntista.service';
import { MovimentacaoService } from 'src/app/services/movimentacao.service';
import {Router} from "@angular/router"
import { UpperCasePipe } from '@angular/common';

@Component({
  selector: 'app-movimentacao-new',
  templateUrl: './movimentacao-new.component.html',
  styleUrls: ['./movimentacao-new.component.css'],
  providers: [UpperCasePipe]
})
export class MovimentacaoNewComponent implements OnInit {
  correntistas:any;
  correntista:any;

  dataHora:any;
  descricao:any;
  valor:any;
  tipo:any;

  constructor(
    private movimentacaoService: MovimentacaoService,
    private correntistaService: CorrentistaService,
    private router: Router,
    private uppercasePipe: UpperCasePipe
    ) { }

  ngOnInit(): void {
    this.exibirCorrentistas();
  }
  exibirCorrentistas(): void {
    this.correntistaService.list()
      .subscribe(
        data => {
          this.correntistas = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  save(): void {
    console.log(this.correntista)
    const movimentacao = {
      valor:this.valor,
      descricao:this.uppercasePipe.transform(this.descricao),
      tipo:this.tipo,
      idConta:this.correntista.id,
      dataHora:this.dataHora

    };
    console.log(movimentacao);
    this.movimentacaoService.create(movimentacao)
      .subscribe(
        response => {
          console.log(response);
          this.router.navigate(['/movimentacoes'])
        },
        error => {
          console.log(error);
        });
  }

}
