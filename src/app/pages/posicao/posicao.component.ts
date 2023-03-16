import { Component, OnInit } from '@angular/core';
import { faBus, faTrash, faFileExcel, faMagnifyingGlass, faMap, faLocation } from '@fortawesome/free-solid-svg-icons';
import { ExcelService } from 'src/app/excel.service';
import { SptransService } from 'src/app/sptrans.service';
import * as L from 'leaflet';
import * as Papa from 'papaparse';

@Component({
  selector: 'app-posicao',
  templateUrl: './posicao.component.html',
  styleUrls: ['./posicao.component.scss']
})
export class PosicaoComponent implements OnInit {

  public map: L.Map;
  
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


  arrayTrips = [];

  public pesquisa: string;
  public linha: number;
  public carregando: boolean;

  ngOnInit(): void {

    this.map = L.map('map').setView([-23.542683500000003, -46.4699445], 17);
  
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

  consultaPosicaoDosVeiculos(linha: number){
    let coordenadas: L.LatLngExpression[] = [
      [-23.538649, -46.441582],
      [-23.538690, -46.441559],
      [-23.538709, -46.441548],
      [-23.538681, -46.441477],
      [-23.538375, -46.440980],
      [-23.538006, -46.440372],
      [-23.537749, -46.439951],
      [-23.537630, -46.439757],
      [-23.537423, -46.439425],
      [-23.537442, -46.439410],
      [-23.538393, -46.438716],
      [-23.538073, -46.438495],
      [-23.537605, -46.438180],
      [-23.537415, -46.438081],
      [-23.537265, -46.438025],
      [-23.537056, -46.437978],
      [-23.536979, -46.437962],
      [-23.536711, -46.437945],
      [-23.536560, -46.437962],
      [-23.536512, -46.437967],
      [-23.536356, -46.437998],
      [-23.536234, -46.438033],
      [-23.536033, -46.438104],
      [-23.535926, -46.438168],
      [-23.535780, -46.438279],
      [-23.535743, -46.438318],
      [-23.535673, -46.438369],
      [-23.535655, -46.438375],
      [-23.535644, -46.438392],
      [-23.535139, -46.438818],
      [-23.534720, -46.439162],
      [-23.534296, -46.439537],
      [-23.533070, -46.440601],
      [-23.532800, -46.440840],
      [-23.532662, -46.440960],
      [-23.532492, -46.441095],
      [-23.532425, -46.441156],
      [-23.532110, -46.441182],
      [-23.532042, -46.441141],
      [-23.532005, -46.441112],
      [-23.531979, -46.441043],
      [-23.531958, -46.441123],
      [-23.531933, -46.441174],
      [-23.531910, -46.441287],
      [-23.531832, -46.441420],
      [-23.531866, -46.441493],
      [-23.531934, -46.441537],
      [-23.531985, -46.441545],
      [-23.532063, -46.441568],
      [-23.532166, -46.441598],
      [-23.532429, -46.441844],
      [-23.532660, -46.442056],
      [-23.532785, -46.442199],
      [-23.533005, -46.442512],
      [-23.533193, -46.442804],
      [-23.533401, -46.443138],
      [-23.533789, -46.443762],
      [-23.534076, -46.444217],
      [-23.534366, -46.444699],
      [-23.534639, -46.445156],
      [-23.534938, -46.445651],
      [-23.535504, -46.446588],
      [-23.536077, -46.447550],
      [-23.536368, -46.448017],
      [-23.536643, -46.448472],
      [-23.537243, -46.449431],
      [-23.536399, -46.450045],
      [-23.535540, -46.450672],
      [-23.534977, -46.451087],
      [-23.534676, -46.451308],
      [-23.535063, -46.451920],
      [-23.535000, -46.451985],
      [-23.534295, -46.452489],
      [-23.534175, -46.452763],
      [-23.534169, -46.452792],
      [-23.534172, -46.452824],
      [-23.534185, -46.452867],
      [-23.534200, -46.452905],
      [-23.534232, -46.452906],
      [-23.534313, -46.452960],
      [-23.534435, -46.453124],
      [-23.534569, -46.453303],
      [-23.534678, -46.453457],
      [-23.534711, -46.453550],
      [-23.534736, -46.453628],
      [-23.534738, -46.453662],
      [-23.534727, -46.453719],
      [-23.534730, -46.453858],
      [-23.534801, -46.453978],
      [-23.534881, -46.454161],
      [-23.535014, -46.454450],
      [-23.535150, -46.454518],
      [-23.535276, -46.454571],
      [-23.535411, -46.454591],
      [-23.535457, -46.454588],
      [-23.535483, -46.454575],
      [-23.535507, -46.454558],
      [-23.535549, -46.454449],
      [-23.535571, -46.454385],
      [-23.535588, -46.454242],
      [-23.535640, -46.454121],
      [-23.535689, -46.454078],
      [-23.535796, -46.453993],
      [-23.536022, -46.454118],
      [-23.536519, -46.454461],
      [-23.537420, -46.455046],
      [-23.537514, -46.455108],
      [-23.538413, -46.455708],
      [-23.538349, -46.455812],
      [-23.538316, -46.455866],
      [-23.538320, -46.455969],
      [-23.538337, -46.456030],
      [-23.538384, -46.456115],
      [-23.539187, -46.456505],
      [-23.539367, -46.456586],
      [-23.539654, -46.456664],
      [-23.539928, -46.456708],
      [-23.540301, -46.456730],
      [-23.540515, -46.456757],
      [-23.540647, -46.456798],
      [-23.540769, -46.456869],
      [-23.540989, -46.457043],
      [-23.541223, -46.457254],
      [-23.541893, -46.457946],
      [-23.542287, -46.458323],
      [-23.542357, -46.458391],
      [-23.542588, -46.458623],
      [-23.542670, -46.458740],
      [-23.542706, -46.458790],
      [-23.542797, -46.458985],
      [-23.542959, -46.459400],
      [-23.543059, -46.459620],
      [-23.543179, -46.459842],
      [-23.543325, -46.460038],
      [-23.543457, -46.460157],
      [-23.543511, -46.460208],
      [-23.543632, -46.460302],
      [-23.543828, -46.460395],
      [-23.544209, -46.460510],
      [-23.544987, -46.460731],
      [-23.545785, -46.460973],
      [-23.545683, -46.461285],
      [-23.545486, -46.461774],
      [-23.545302, -46.462120],
      [-23.545219, -46.462296],
      [-23.544889, -46.462891],
      [-23.544626, -46.463398],
      [-23.544503, -46.463692],
      [-23.544442, -46.463850],
      [-23.544404, -46.464015],
      [-23.544351, -46.464190],
      [-23.544323, -46.464306],
      [-23.543573, -46.464161],
      [-23.543467, -46.464133],
      [-23.543438, -46.464287],
      [-23.543420, -46.464414],
      [-23.543394, -46.464517],
      [-23.543362, -46.464604],
      [-23.543251, -46.464951],
      [-23.543140, -46.465292],
      [-23.543076, -46.465486],
      [-23.542867, -46.465921],
      [-23.542710, -46.466208],
      [-23.542564, -46.466541],
      [-23.542522, -46.466707],
      [-23.542491, -46.467024],
      [-23.542559, -46.467672],
      [-23.542566, -46.467976],
      [-23.542568, -46.468179],
      [-23.542608, -46.468601],
      [-23.542652, -46.468783],
      [-23.542690, -46.468992],
      [-23.542742, -46.469345],
      [-23.542626, -46.469438],
      [-23.542582, -46.469514],
      [-23.542558, -46.469556],
      [-23.542561, -46.469607],
      [-23.542469, -46.469607],
      [-23.542325, -46.469665],
      [-23.542274, -46.469726],
      [-23.542243, -46.469812],
      [-23.542218, -46.469894],
      [-23.542233, -46.469943],
      [-23.542253, -46.470004],
      [-23.542264, -46.470040],
      [-23.542269, -46.470070],
      [-23.542280, -46.470132],
      [-23.542291, -46.470193],
      [-23.542305, -46.470290],
      [-23.542318, -46.470356],
      [-23.542329, -46.470423],
      [-23.542339, -46.470469],
      [-23.542348, -46.470520],
      [-23.542356, -46.470574],
      [-23.542366, -46.470617],
      [-23.542377, -46.470678],
      [-23.542390, -46.470766],
      [-23.542402, -46.470845],
      [-23.542413, -46.470914],
      [-23.542430, -46.471007],
      [-23.542438, -46.471061],
      [-23.542450, -46.471125],
      [-23.542461, -46.471190],
      [-23.542473, -46.471257],
      [-23.542481, -46.471302],
      [-23.542493, -46.471360],
      [-23.542503, -46.471423],
      [-23.542517, -46.471489],
      [-23.542522, -46.471539],
      [-23.542532, -46.471590],
      [-23.542557, -46.471771]

    ];

    var limites = L.latLngBounds(coordenadas);

    var pontoCentral = limites.getCenter();

    var route = L.polyline(coordenadas, {
      color: '#dc3545',
      weight: 5,
      opacity: 0.7
  }).addTo(this.map);

  const markerIni = L.marker([-23.538649, -46.441582]).addTo(this.map);
  // markerIni.bindPopup("<b>Ponto de Partida</b>").togglePopup()
  const markerFim = L.marker([-23.542557, -46.471771]).addTo(this.map);
  // markerFim.bindPopup("<b>Ponto de Chegada</b>").openPopup();


  var tooltipIni = L.tooltip()
    .setLatLng([-23.538649, -46.441582])
    .setContent("<b>Ponto de Partida</b>")
    .addTo(this.map);

  var tooltipFim = L.tooltip()
    .setLatLng([-23.542557, -46.471771])
    .setContent("<b>Ponto de Chegada</b>")
    .addTo(this.map);

    var bounds = L.latLngBounds(coordenadas);
    this.map.fitBounds(bounds, { padding: [50, 50] });

    var zoomAtual = this.map.getZoom();

  this.map.setView(pontoCentral, zoomAtual);
  

  }

  consultaPosicaoDosVeiculosAll() {

    const marker = L.marker([-23.529542499999998, -46.420608]).addTo(this.map);

    marker.bindPopup("<b>Carro No</b><br>36314");

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors',
      maxZoom: 18,
    }).addTo(this.map);

    
  }
  

  limpar(){
    // this.pesquisa = "";
    // this.carregando = false;

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
      
        var myObj = JSON.parse(JSON.stringify(parsed.data));

        this.arrayTrips = Array.from(parsed.data);

        const filteredTrips = this.arrayTrips.filter(trip => trip.route_id === "407T-10");
        console.log(filteredTrips);
        console.log(filteredTrips[0].route_id);
        console.log(filteredTrips[0].shape_id);

    
    }, error => {
      console.error(error);
    });

  }


}

