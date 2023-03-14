import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { faBus, faTrash, faFileExcel, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { ExcelService } from 'src/app/excel.service';
import { SptransService } from 'src/app/sptrans.service';

@Component({
  selector: 'app-linhas',
  templateUrl: './linhas.component.html',
  styleUrls: ['./linhas.component.scss']
})
export class LinhasComponent implements OnInit {

  displayedColumns: string[] = [
    'ic',
    'cl',
    'lc',
    'lt',
    'tl',
    'sl',
    'tp',
    'ts'
    
  ]

  excelDataSource = [];
  jsonDataSource = [];
  tokenDataSource: IToken[];


  constructor(
    private sptransService: SptransService,
    private excelService: ExcelService,
  ) { }

  faBus = faBus;
  faTrash = faTrash;
  faFileExcel = faFileExcel;
  faMagnifyingGlass= faMagnifyingGlass;


  currentPage: number;
  totalPages: number;
  pages: number[];

  public erroApi: boolean;

  public pesquisa: string;
  public carregando: boolean;

  ngOnInit(): void {
    this.setPage(1);
  }

  consultaLinha(termoBusca: string){

    this.carregando = true;
    this.sptransService.getToken().subscribe(
      data => {
        var myObj = JSON.parse(JSON.stringify(data));
        this.sptransService.getLinhas(termoBusca, myObj.access_token).subscribe(
          res => {
            this.jsonDataSource = res;
            this.totalPages = Math.ceil(this.jsonDataSource.length / 15); // supondo que serão exibidos 10 itens por página
            this.pages = Array.from({length: this.totalPages}, (_, i) => i + 1);
            this.excelDataSource = res;
            this.carregando = false;
          }
        )
        
      },
      (error: HttpErrorResponse) => {

        const alertPlaceholder = document.getElementById('liveAlertPlaceholder')

        const alert = (message, type) => {
          const wrapper = document.createElement('div')
          wrapper.innerHTML = [
            `<div class="alert alert-${type} alert-dismissible" role="alert">`,
            `   <div>${message}</div>`,
            '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
            '</div>'
          ].join('')

          alertPlaceholder.append(wrapper)
        }

        alert(`Erro status: ${error.status}. Falha no acesso ä API. Revisar seus dados de acesso em configurações`, 'danger')

        this.carregando = false;
      }
    );

  }

  limpar() {
    this.pesquisa = "";
    this.excelDataSource = [];
    this.jsonDataSource = [];
    this.carregando = false;

  }


  setPage(page: number) {
    if (page < 1 || page > this.totalPages) {
      return;
    }
    this.currentPage = page;
  }

  previousPage() {
    this.setPage(this.currentPage - 1);
  }

  nextPage() {
    this.setPage(this.currentPage + 1);
  }

  getPaginatedData() {
    const startIndex = (this.currentPage - 1) * 15;
    const endIndex = startIndex + 15;
    return this.jsonDataSource.slice(startIndex, endIndex);
  } 
  

  exportarLinhas() {
    this.excelService.generateExcelLinhas(this.excelDataSource);
  }

}

export interface ILinhas {

  ic: any,
  cl: number,
  lc: Boolean,
  lt: string,
  sl: number,
  tl: number,
  tp: string,
  ts: string
}

var iLinhas: ILinhas[] = [];

export interface IToken {
  access_token: string,
  scope: string,
  token_type: string,
  expires_in: number
}

var iToken: IToken[] = [];

