import { Component } from '@angular/core';
import { faBus, faLocation, faMap, faWarehouse } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'sptrans';

  faBus = faBus;
  faLocation = faLocation;
  faMap = faMap;
  faWarehouse = faWarehouse;

  public linhas: Boolean;
  public itinerarios: Boolean;
  public empresas: Boolean;
  public posicao: Boolean;

  ativarLinhas() {
    this.linhas = true;
    this.itinerarios = false;
    this.empresas = false;
    this.posicao = false;
  }

  ativarItinerarios() {
    this.linhas = false;
    this.itinerarios = true;
    this.empresas = false;
    this.posicao = false;
  }

  ativarEmpresas() {
    this.linhas = false;
    this.itinerarios = false;
    this.empresas = true;
    this.posicao = false;
  }

  ativarPosicao() {
    this.linhas = false;
    this.itinerarios = false;
    this.empresas = false;
    this.posicao = true;
  }

}
