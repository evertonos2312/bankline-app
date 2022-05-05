import { Component, OnInit } from '@angular/core';
import { CorrentistaService } from 'src/app/services/correntista.service';
import {Router, NavigationEnd,ActivatedRoute} from '@angular/router';
import { UpperCasePipe } from '@angular/common';

@Component({
  selector: 'app-correntista',
  templateUrl: './correntista.component.html',
  styleUrls: ['./correntista.component.css'],
  providers: [UpperCasePipe]
})
export class CorrentistaComponent implements OnInit {
  correntistas:any;
  cpf:any;
  nome:any;
  constructor(
    private correntistaService: CorrentistaService,
    private router: Router, private activatedRoute: ActivatedRoute,
    private uppercasePipe: UpperCasePipe
    ) { }
  ngOnInit(): void {
    this.exibirCorrentistas();
  }
  exibirCorrentistas(): void {
    this.cpf = "";
    this.nome = "";
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
    const correntista = {
      cpf:this.cpf,
      nome:this.uppercasePipe.transform(this.nome), 
    };
    console.log(correntista);
    this.correntistaService.create(correntista)
      .subscribe(
        response => {
          console.log(response);
          this.exibirCorrentistas();
        },
        error => {
          console.log(error);
        });
  }

}
