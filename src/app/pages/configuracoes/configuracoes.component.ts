import { Component, OnInit } from '@angular/core';
import { faBus, faLocation, faMap, faWarehouse, faGear, faTrash, faMagnifyingGlass, faCircleCheck } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-configuracoes',
  templateUrl: './configuracoes.component.html',
  styleUrls: ['./configuracoes.component.scss']
})
export class ConfiguracoesComponent implements OnInit {

  constructor() { 
    this.storage = window.localStorage;

  }

  public storage: Storage;

  faBus = faBus;
  faLocation = faLocation;
  faMap = faMap;
  faWarehouse = faWarehouse;
  faGear = faGear;
  faTrash = faTrash;
  faMagnifyingGlass = faMagnifyingGlass;
  faCircleCheck = faCircleCheck;

  public spTransConsumerKey: string;
  public spTransConsumerSecret: string;
  public googleMapsApiKey: string;
  public carregando: boolean;

  public spTransConsumerKeyConf: string;
  public spTransConsumerSecretConf: string;
  public googleMapsApiKeyConf: string;

  ngOnInit(): void {
    this.carregando = false;
    this.spTransConsumerKey = undefined;
    this.spTransConsumerSecret = undefined;
    this.googleMapsApiKey = undefined;

    this.spTransConsumerKeyConf = this.storage.getItem("spTransConsumerKey");
    this.spTransConsumerSecretConf = this.storage.getItem("spTransConsumerSecret");
    this.googleMapsApiKeyConf = this.storage.getItem("googleMapsApiKey");
  }

  configurarAcessos() {
    this.storage.removeItem("spTransConsumerKey");
    this.storage.removeItem("spTransConsumerSecret");
    this.storage.removeItem("googleMapsApiKey");

    this.storage.setItem("spTransConsumerKey", this.spTransConsumerKey);
    this.storage.setItem("spTransConsumerSecret", this.spTransConsumerSecret);
    this.storage.setItem("googleMapsApiKey", this.googleMapsApiKey);
    this.limpar();

    this.spTransConsumerKeyConf = this.storage.getItem("spTransConsumerKey");
    this.spTransConsumerSecretConf = this.storage.getItem("spTransConsumerSecret");
    this.googleMapsApiKeyConf = this.storage.getItem("googleMapsApiKey");

  }

  limpar(){
    this.spTransConsumerKey = undefined;
    this.spTransConsumerSecret = undefined;
    this.googleMapsApiKey = undefined;
  }

  load() {
      location.reload();
  }


}
