import { Component, OnInit } from '@angular/core';
import { faBus, faTrash, faFileExcel, faMagnifyingGlass, faMap, faLocation } from '@fortawesome/free-solid-svg-icons';
import { ExcelService } from 'src/app/excel.service';
import { SptransService } from 'src/app/sptrans.service';

@Component({
  selector: 'app-posicao',
  templateUrl: './posicao.component.html',
  styleUrls: ['./posicao.component.scss']
})
export class PosicaoComponent implements OnInit {

  constructor(
    private sptransService: SptransService
  ) {
    this.storage = window.localStorage;
  }

  public storage: Storage;

  faBus = faBus;
  faTrash = faTrash;
  faFileExcel = faFileExcel;
  faMagnifyingGlass= faMagnifyingGlass;
  faMap = faMap;
  faLocation = faLocation;

  public pesquisa: string;
  public carregando: boolean;

  ngOnInit(): void {
  }

  consultaPosicaoDosVeiculos(linha: string){
    

  }

  consultaPosicaoDosVeiculosAll() {


    
  }
  

  limpar(){
    this.pesquisa = "";
    this.carregando = false;
  }

}

