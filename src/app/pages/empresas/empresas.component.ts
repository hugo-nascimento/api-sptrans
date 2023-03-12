import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { faBus, faTrash, faFileExcel, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { ExcelService } from 'src/app/excel.service';
import { SptransService } from 'src/app/sptrans.service';

@Component({
  selector: 'app-empresas',
  templateUrl: './empresas.component.html',
  styleUrls: ['./empresas.component.scss']
})
export class EmpresasComponent implements AfterViewInit {

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
  tokenDataSource: IToken[];
  dataSource = new MatTableDataSource<ILinhas>(iLinhas);

  @ViewChild(MatPaginator) paginatorLinha: MatPaginator;

  constructor(
    private sptransService: SptransService,
    private excelService: ExcelService
  ) { }

  faBus = faBus;
  faTrash = faTrash;
  faFileExcel = faFileExcel;
  faMagnifyingGlass= faMagnifyingGlass;



  public pesquisa: string;
  public carregando: boolean;

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginatorLinha;
    this.pesquisa = undefined;
  }

  consultaLinha(termoBusca: string){

    this.carregando = true;
    this.sptransService.getToken().subscribe(
      data => {
        var myObj = JSON.parse(JSON.stringify(data));

        this.sptransService.getLinhas(termoBusca, myObj.access_token).subscribe(
          res => {
            this.excelDataSource = res;
            this.dataSource = new MatTableDataSource<ILinhas>(res);
            this.dataSource.paginator = this.paginatorLinha
            this.carregando = false;
          }
        )
        
      }
    );

  }

  limpar() {
    this.pesquisa = "";
    this.excelDataSource = [];
    this.dataSource = new MatTableDataSource<ILinhas>(iLinhas);
    this.dataSource.paginator = this.paginatorLinha;
    this.carregando = false;

  }

  exportarEmpresas() {
    // this.excelService.generateExcelLinhas(this.excelDataSource);
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


