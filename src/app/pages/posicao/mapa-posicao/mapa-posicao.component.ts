import { Component, OnInit } from '@angular/core';
import mapboxgl from 'mapbox-gl';
import MapboxLanguage from '@mapbox/mapbox-gl-language';

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

    mapboxgl.accessToken = this.storage.getItem("mapBoxToken");

    const map = new mapboxgl.Map({
        container: 'map',
        // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [-46.427527624999996, -23.536912375],
        zoom: 14
    });

    // Create a default Marker and add it to the map.
    const marker1 = new mapboxgl.Marker()
        .setLngLat([-46.427527624999996, -23.536912375])
        .addTo(map);

    // Create a default Marker, colored black, rotated 45 degrees.
    const marker2 = new mapboxgl.Marker({ color: 'black', rotation: 45 })
        .setLngLat([-46.422716, -23.5436175])
        .addTo(map);
    
    // Create a default Marker and add it to the map.
    const marker3 = new mapboxgl.Marker()
        .setLngLat([-46.411161500000006, -23.54375225])
        .addTo(map);

    // Create a default Marker, colored black, rotated 45 degrees.
    const marker4 = new mapboxgl.Marker({ color: 'black', rotation: 45 })
        .setLngLat([-46.426030875, -23.5403225])
        .addTo(map);
    // Create a default Marker and add it to the map.

    const marker5 = new mapboxgl.Marker()
        .setLngLat([-46.43119, -23.5329305])
        .addTo(map);

    // Create a default Marker, colored black, rotated 45 degrees.
    const marker6 = new mapboxgl.Marker({ color: 'black', rotation: 45 })
        .setLngLat([-46.44533225, -23.530976000000003])
        .addTo(map);

  }


}
