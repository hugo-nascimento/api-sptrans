import { Component, OnInit } from '@angular/core';
import { faBus, faTrash, faFileExcel, faMagnifyingGlass, faMap, faLocation } from '@fortawesome/free-solid-svg-icons';
import { ExcelService } from 'src/app/excel.service';
import { SptransService } from 'src/app/sptrans.service';

@Component({
  selector: 'app-itinerarios',
  templateUrl: './itinerarios.component.html',
  styleUrls: ['./itinerarios.component.scss']
})
export class ItinerariosComponent implements OnInit {

  constructor(
    private sptransService: SptransService
  ) { }

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

  consultaItinerario(linha: string){

  }

  limpar(){
    this.pesquisa = "";
    this.carregando = false;
  }
}
