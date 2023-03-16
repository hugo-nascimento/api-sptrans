import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class SptransService {
  
  constructor(private httpClient: HttpClient) { 
    this.storage = window.localStorage;
  }
  
  public storage: Storage;

  public getToken() {
    
    var url = '/token';

    let body = new URLSearchParams();

    var consumerkey = this.storage.getItem("spTransConsumerKey");
    var consumersecret = this.storage.getItem("spTransConsumerSecret");

    body.set('grant_type', 'client_credentials');
    body.set('consumer-key', consumerkey);
    body.set('consumer-secret', consumersecret);

    var grant = btoa(consumerkey + ':' + consumersecret);


    let options = {headers: new HttpHeaders()
      .set('Authorization', `Basic ${grant}`)
      .set('consumer-key', consumerkey)
      .set('consumer-secret', consumersecret)
      .set('Content-Type', 'application/x-www-form-urlencoded')
      , withCredentials: true };

    return this.httpClient.post(url, body, options);

  }

  public getLinhas(termoBusca: string, token: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })};

    return this.httpClient.get(`/sptrans/olhovivo/v2.1/Linha/Buscar?termosBusca=${termoBusca}`, httpOptions)
  }

  public getEmpresas(token: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })};

    return this.httpClient.get('/api/sptrans/olhovivo/v2.1/Empresa', httpOptions)
  }

  public getPosicaoLinha(linha: number, token: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })};

    return this.httpClient.get(`/sptrans/olhovivo/v2.1/Posicao/Linha?codigoLinha=${linha}`, httpOptions)
  }

  public getGtfs() {
    return this.httpClient.get('../../../assets/gtfs/trips.txt', { responseType: 'text' })
    
  }

  public getGtfsShapes() {
    return this.httpClient.get('../../../assets/gtfs/shapes.txt', { responseType: 'text' })
  }




}
