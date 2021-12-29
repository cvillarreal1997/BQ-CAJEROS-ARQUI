import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { constants } from '../constants';

@Injectable({
  providedIn: 'root',
})
export class LoanService {
  url = constants.loanApi.url;
  constructor(private httpClient: HttpClient) {}

  getClientLoan(clientId: string) {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    console.log(
      this.url + 'prestamoCliente/cliente/' + clientId + '/'
    );
    return this.httpClient.get(
        this.url + 'prestamoCliente/cliente/' + clientId + '/',
      {
        headers: headers,
      }
    );
  }  

  getQuotes(loanId: string){
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    console.log(
      this.url + 'cuota/cuotaPrestamo/' + loanId + '/'
    );
    return this.httpClient.get(
      this.url + 'cuota/cuotaPrestamo/' + loanId + '/',
      {
        headers: headers,
      }
    );
  }

  payQuote(body: any){
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    console.log(this.url+'cuota/pago/'+JSON.stringify(body));
    return this.httpClient.put(this.url+'cuota/pago/', body, {
      headers,
    });
  }
}