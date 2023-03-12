import { Component } from '@angular/core';
import { faBus, faLocation, faMap, faWarehouse, faGear } from '@fortawesome/free-solid-svg-icons';

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
  faGear = faGear;

  public linhas: Boolean;
  public itinerarios: Boolean;
  public empresas: Boolean;
  public posicao: Boolean;
  public configuracoes: Boolean;

  ativarLinhas() {
    this.linhas = true;
    this.itinerarios = false;
    this.empresas = false;
    this.posicao = false;
    this.configuracoes = false;
  }

  ativarItinerarios() {
    this.linhas = false;
    this.itinerarios = true;
    this.empresas = false;
    this.posicao = false;
    this.configuracoes = false;
  }

  ativarEmpresas() {
    this.linhas = false;
    this.itinerarios = false;
    this.empresas = true;
    this.posicao = false;
    this.configuracoes = false;
  }

  ativarPosicao() {
    this.linhas = false;
    this.itinerarios = false;
    this.empresas = false;
    this.posicao = true;
    this.configuracoes = false;
  }

  ativarConfiguracoes(){
    this.linhas = false;
    this.itinerarios = false;
    this.empresas = false;
    this.posicao = false;
    this.configuracoes = true;
  }

}
