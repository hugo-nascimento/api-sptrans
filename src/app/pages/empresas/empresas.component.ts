import { HttpErrorResponse } from '@angular/common/http';
import { OnInit, Component } from '@angular/core';
import { faBus, faTrash, faFileExcel, faMagnifyingGlass, faWarehouse } from '@fortawesome/free-solid-svg-icons';
import { ExcelService } from 'src/app/excel.service';
import { SptransService } from 'src/app/sptrans.service';

@Component({
  selector: 'app-empresas',
  templateUrl: './empresas.component.html',
  styleUrls: ['./empresas.component.scss']
})
export class EmpresasComponent implements OnInit {

  displayedColumns: string[] = [
    'ic',
    'a',
    'c',
    'n'
    
  ]

  excelDataSource = [];
  tokenDataSource: IToken[];
  dataSource = [];
  auxDataSource = [];
  empresaDataSource = [];


  constructor(
    private sptransService: SptransService,
    private excelService: ExcelService
  ) { }

  faBus = faBus;
  faTrash = faTrash;
  faFileExcel = faFileExcel;
  faMagnifyingGlass= faMagnifyingGlass;
  faWarehouse = faWarehouse;

  currentPage: number;
  totalPages: number;
  pages: number[];

  public erroApi: boolean;

  public pesquisa: string;
  public carregando: boolean;


  ngOnInit(): void {
    this.setPage(1);
  }

  consultaEmpresas(){

    this.carregando = true;
    this.sptransService.getToken().subscribe(
      data => {
        var myObj = JSON.parse(JSON.stringify(data));

        this.sptransService.getEmpresas(myObj.access_token).subscribe(
          res => {
            for(let i = 0; i < res.e.length; i++){
              for(let j = 0; j < res.e[i].e.length; j++){
                this.dataSource.push(res.e[i].e[j])
              }
            }
            this.excelDataSource = res;
            this.dataSource = Array.from(this.dataSource);
            this.totalPages = Math.ceil(this.dataSource.length / 15);
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
    this.dataSource = [];
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
    return this.dataSource.slice(startIndex, endIndex);
  } 

  exportarEmpresas() {
    // this.excelService.generateExcelLinhas(this.excelDataSource);
  }
  

}

export interface IEmpresas {

  a: number, // Código da Região
  c: number, // Código da Empresa
  n: string // Nome da Empresa
}

var iEmpresas: IEmpresas[] = [];

export interface IToken {
  access_token: string,
  scope: string,
  token_type: string,
  expires_in: number
}

var iToken: IToken[] = [];


