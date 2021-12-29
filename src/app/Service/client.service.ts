import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { constants } from '../constants';

@Injectable({
  providedIn: 'root',
})
export class ClientsService {
  url = constants.clientsApi.url;
  constructor(private httpClient: HttpClient) {}

  getClient(identificationType: string, identification: string) {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    console.log(
      this.url + 'cliente/' + identificationType + '/' + identification + '/'
    );
    return this.httpClient.get(
      this.url + 'cliente/' + identificationType + '/' + identification + '/',
      {
        headers: headers,
      }
    );
  }

  getClientByID(id: string) {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    console.log(
      this.url + 'cliente/' + id + '/'
    );
    return this.httpClient.get(
      this.url + 'cliente/' + id + '/',
      {
        headers: headers,
      }
    );
  }
}
