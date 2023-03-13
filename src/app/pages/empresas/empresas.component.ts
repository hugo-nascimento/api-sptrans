import { HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { faBus, faTrash, faFileExcel, faMagnifyingGlass, faWarehouse } from '@fortawesome/free-solid-svg-icons';
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
  dataSource = new MatTableDataSource<IEmpresas>(iEmpresas);

  @ViewChild(MatPaginator) paginatorLinha: MatPaginator;

  constructor(
    private sptransService: SptransService,
    private excelService: ExcelService
  ) { }

  faBus = faBus;
  faTrash = faTrash;
  faFileExcel = faFileExcel;
  faMagnifyingGlass= faMagnifyingGlass;
  faWarehouse = faWarehouse;



  public pesquisa: string;
  public carregando: boolean;

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginatorLinha;
    this.pesquisa = undefined;
  }

  consultaEmpresas(){

    this.carregando = true;
    this.sptransService.getToken().subscribe(
      data => {
        var myObj = JSON.parse(JSON.stringify(data));

        this.sptransService.getEmpresas(myObj.access_token).subscribe(
          res => {
            this.excelDataSource = res;
            this.dataSource = new MatTableDataSource<IEmpresas>(res);
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
    this.dataSource = new MatTableDataSource<IEmpresas>(iEmpresas);
    this.dataSource.paginator = this.paginatorLinha;
    this.carregando = false;

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


