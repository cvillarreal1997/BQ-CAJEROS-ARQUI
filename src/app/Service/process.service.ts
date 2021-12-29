import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { constants } from '../constants';
import { OtpRQ } from 'src/Model/OtpRQ';
import { OtpValidationRQ } from 'src/Model/OtpValRQ';

@Injectable({
  providedIn: 'root',
})
export class ProcessService {
  
  url = constants.processApi.url;
  constructor(private httpClient: HttpClient) {}

  generateLogOTP(otpRQ: OtpRQ) {
    let headers = new HttpHeaders().set(
      'Type-content',
      'application/json, charset=UTF-8'
    );
    console.log(this.url+'otp/'+JSON.stringify(otpRQ));
    return this.httpClient.post(this.url + 'otp/', otpRQ, {
      headers,
    });
  }

  validateLogOTP(otpValRQ: OtpValidationRQ) {
    let headers = new HttpHeaders().set(
      'Type-content',
      'application/json, charset=UTF-8'
    );
    console.log(this.url+'otp/validate/'+JSON.stringify(otpValRQ));
    return this.httpClient.post(this.url + 'otp/validate/', otpValRQ, {
      headers,
    });
  }

  getCardStatus(cardId: string){
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    console.log(
      this.url + 'creditCards/status/' + cardId + '/'
    );
    return this.httpClient.get(
        this.url + 'creditCards/status/' + cardId + '/',
      {
        headers: headers,
      }
    );
  }

  payCardStatus(statusId: string, paymentType: string){
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    console.log(
      this.url + 'creditCards/status/' + statusId + '/pay/type/' + paymentType + '/'
    );
    return this.httpClient.post(
        this.url + 'creditCards/status/' + statusId + '/pay/type/' + paymentType + '/',
      {
        headers: headers,
      }
    );
  }
}
