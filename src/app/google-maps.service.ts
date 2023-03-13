import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GoogleMapsService {

  private readonly apiKeyLocalStorageKey = 'googleMapsApiKey';

  constructor() { }

  public getApiKey(): string {
    const apiKey = localStorage.getItem(this.apiKeyLocalStorageKey);
    return apiKey ? apiKey : '';
  }
}
