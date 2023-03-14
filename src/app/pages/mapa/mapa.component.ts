import { Component, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { GoogleMapsService } from 'src/app/google-maps.service';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.scss']
})


export class MapaComponent{
  apiLoaded: Observable<boolean>;
  display: google.maps.LatLngLiteral;
  map: any;

  public storage: Storage;
       
  constructor(
    httpClient: HttpClient,
    private googleMapsService: GoogleMapsService
    ) {
    this.storage = window.localStorage;
    const googleMapsApiKey = this.storage.getItem("googleMapsApiKey");
    this.apiLoaded = httpClient.jsonp(`https://maps.googleapis.com/maps/api/js?key=${googleMapsApiKey}`, 'callback')
        .pipe(
          map(() => true),
          catchError(() => of(false)),
        );
  }
    
  center: google.maps.LatLngLiteral = {lat: -23.5421205, lng: -46.471834};
  zoom = 16;

  moveMap(event: google.maps.MapMouseEvent) {
    this.center = (event.latLng.toJSON());
  }

  move(event: google.maps.MapMouseEvent) {
    this.display = event.latLng.toJSON();
  }

  

}
