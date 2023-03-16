import { Component, OnInit } from '@angular/core';
import { faBus, faTrash, faFileExcel, faMagnifyingGlass, faMap, faLocation } from '@fortawesome/free-solid-svg-icons';
import { ExcelService } from 'src/app/excel.service';
import { SptransService } from 'src/app/sptrans.service';
import * as L from 'leaflet';
import * as Papa from 'papaparse';



@Component({
  selector: 'app-itinerarios',
  templateUrl: './itinerarios.component.html',
  styleUrls: ['./itinerarios.component.scss']
})
export class ItinerariosComponent implements OnInit {

  public map: L.Map;

  arrayTrips = [];
  arrayShapes = [];
  pontoPartida = [];
  pontoChegada = [];

  layerGroup;

  constructor(
    private sptransService: SptransService
  ) { }

  faBus = faBus;
  faTrash = faTrash;
  faFileExcel = faFileExcel;
  faMagnifyingGlass= faMagnifyingGlass;
  faMap = faMap;
  faLocation = faLocation;

  public pesquisaLinha: string;
  public pesquisaCodigo: string;
  public pesquisaSentido: string;
  public carregando: boolean;

  ngOnInit(): void {
    this.map = L.map('map').setView([-23.542683500000003, -46.4699445], 17);
    this.layerGroup = L.layerGroup().addTo(this.map);
  
  // adiciona o tileLayer ao mapa
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors',
    maxZoom: 18,
  }).addTo(this.map);

  // verifica se o mapa já foi carregado antes de adicionar os marcadores
  this.map.on('load', () => {
    const marker = L.marker([-23.529542499999998, -46.420608]).addTo(this.map);
    marker.bindPopup("<b>Carro No</b><br>36314");
  });
  }

  consultaItinerario(){

    this.map.removeLayer(this.layerGroup);

    this.layerGroup = L.layerGroup().addTo(this.map);

    this.carregando = true;
    this.pontoPartida = [];
    this.pontoChegada = [];

    var linha = this.pesquisaLinha + '-' + this.pesquisaCodigo 

    this.sptransService.getGtfs().subscribe(data => {
      const parsed = Papa.parse(data, {
          delimiter: "",	// auto-detect
          newline: "",	// auto-detect
          quoteChar: '"',
          escapeChar: '"',
          header: true,
          transformHeader: undefined,
          dynamicTyping: false,
          preview: 0,
          encoding: "",
          worker: false,
          comments: false,
          step: undefined,
          complete: undefined,
          error: undefined,
          download: false,
          downloadRequestHeaders: undefined,
          downloadRequestBody: undefined,
          skipEmptyLines: false,
          chunk: undefined,
          chunkSize: undefined,
          fastMode: undefined,
          beforeFirstChunk: undefined,
          withCredentials: undefined,
          transform: undefined,
          delimitersToGuess: [',', '\t', '|', ';', Papa.RECORD_SEP, Papa.UNIT_SEP]
        });
      
        this.arrayTrips = Array.from(parsed.data);

        const filteredTrips = this.arrayTrips.filter(trip => trip.route_id === linha && trip.direction_id === (parseInt(this.pesquisaSentido) - 1).toString());

        this.sptransService.getGtfsShapes().subscribe(data => {
          const shapesParsed = Papa.parse(data, {
              delimiter: "",	// auto-detect
              newline: "",	// auto-detect
              quoteChar: '"',
              escapeChar: '"',
              header: true,
              transformHeader: undefined,
              dynamicTyping: false,
              preview: 0,
              encoding: "",
              worker: false,
              comments: false,
              step: undefined,
              complete: undefined,
              error: undefined,
              download: false,
              downloadRequestHeaders: undefined,
              downloadRequestBody: undefined,
              skipEmptyLines: false,
              chunk: undefined,
              chunkSize: undefined,
              fastMode: undefined,
              beforeFirstChunk: undefined,
              withCredentials: undefined,
              transform: undefined,
              delimitersToGuess: [',', '\t', '|', ';', Papa.RECORD_SEP, Papa.UNIT_SEP]
          });
          
    
          this.arrayShapes = Array.from(shapesParsed.data);

          const filteredShapes = this.arrayShapes.filter(shape => shape.shape_id === filteredTrips[0].shape_id);

          let coordenadas: L.LatLngExpression[] = [];

          for (let i = 0; i < filteredShapes.length; i++) {
 
            const latLng: L.LatLngExpression = [filteredShapes[i].shape_pt_lat, filteredShapes[i].shape_pt_lon];
            if (i === 0 || i === filteredShapes.length - 1) {
              this.pontoPartida.push([filteredShapes[i].shape_pt_lat, filteredShapes[i].shape_pt_lon])
            }

            coordenadas.push(latLng);
          }

          var limites = L.latLngBounds(coordenadas);

          var pontoCentral = limites.getCenter();

          var route = L.polyline(coordenadas, {
            color: '#0d6efd',
            weight: 8,
            opacity: 0.7
        }).addTo(this.layerGroup);

        var tooltipIni = L.tooltip()
          .setLatLng(this.pontoPartida[0])
          .setContent("<b>Ponto de Partida</b>")
          .addTo(this.layerGroup);

        var tooltipFim = L.tooltip()
          .setLatLng(this.pontoPartida[1])
          .setContent("<b>Ponto de Chegada</b>")
          .addTo(this.layerGroup);

        var bounds = L.latLngBounds(coordenadas);
        this.map.fitBounds(bounds, { padding: [50, 50] });
    
        var zoomAtual = this.map.getZoom();
      
        this.map.setView(pontoCentral, zoomAtual);

        this.carregando = false;

      }, error => {
        console.error(error);
        this.carregando = false;
    });

    
    }, error => {
      console.error(error);
      this.carregando = false;
    });

  }

  limpar(){
    this.pesquisaLinha = "";
    this.pesquisaCodigo = "";
    this.carregando = false;
  }
}
