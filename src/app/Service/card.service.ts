import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { constants } from '../constants';

@Injectable({
  providedIn: 'root',
})
export class CardService {
  url = constants.cardsApi.url;
  constructor(private httpClient: HttpClient) {}

  getClientCard(clientId: string) {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    console.log(
      this.url + 'tarjetaCliente/codcliente/' + clientId + '/'
    );
    return this.httpClient.get(
        this.url + 'tarjetaCliente/codcliente/' + clientId + '/',
      {
        headers: headers,
      }
    );
  }

  getCard(cardId: string) {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    console.log(
      this.url + 'tarjetaCliente/nroTarjeta/' + cardId + '/'
    );
    return this.httpClient.get(
        this.url + 'tarjetaCliente/nroTarjeta/' + cardId + '/',
      {
        headers: headers,
      }
    );
  }

  cardTransaction(transaccion: any){
    let headers = new HttpHeaders().set(
      'Type-content',
      'application/json, charset=UTF-8'
    );
    console.log(this.url+'transaccion/'+JSON.stringify(transaccion));
    return this.httpClient.post(this.url+'transaccion/', transaccion, {
      headers,
    });
  }
  
}