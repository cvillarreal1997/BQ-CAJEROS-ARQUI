import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { constants } from '../constants';
import { User } from 'src/Model/User';

@Injectable({
  providedIn: 'root',
})
export class BQAuthService {
  
  url = constants.authApi.url;
  constructor(private httpClient: HttpClient) {}

  login(body: any) {
    let headers = new HttpHeaders().set(
      'Type-content',
      'application/json, charset=UTF-8'
    );
    console.log(this.url+'user/login/'+JSON.stringify(body));
    return this.httpClient.post(this.url + 'user/login/', body, {
      headers,
    });
  }

  createUser(user: any) {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    console.log(this.url+'user/'+JSON.stringify(user));
    return this.httpClient.post(this.url + 'user/', user, {
      headers: headers,
    });
  }

  updateUser(user: User) {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.httpClient.put(this.url + 'user/', JSON.stringify(user), {
      headers: headers,
    });
  }

  deleteUser(id: number) {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    console.log(this.url + 'user/' + id + '/');
    return this.httpClient.delete(this.url + 'user/' + id + '/', {
      headers: headers,
    });
  }
}
