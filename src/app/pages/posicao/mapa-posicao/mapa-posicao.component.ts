import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mapa-posicao',
  templateUrl: './mapa-posicao.component.html',
  styleUrls: ['./mapa-posicao.component.scss']
})
export class MapaPosicaoComponent implements OnInit {

  constructor() {
    this.storage = window.localStorage;
  }

  public storage: Storage;

  ngOnInit(): void {

   

  }

  


}
