import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable} from 'rxjs';
import { constants } from "../constants";
import { Retiro } from 'src/Model/Retiro';
import { Deposito } from 'src/Model/Deposito';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
    
  baseUrl = constants.pasivesApi.url;
  constructor(private http: HttpClient) { }

  obtainProducts(clientCode :String): Observable<Object>{
    return this.http.get(this.baseUrl + 'clienteProductoPasivo/codcliente/'+clientCode);
  }

  obtainOneProduct(cuentaId: String): Observable<Object>{
    console.log(this.baseUrl+'clienteProductoPasivo/nroCuenta/'+cuentaId);
      return this.http.get(this.baseUrl+'clienteProductoPasivo/nroCuenta/'+cuentaId);
  }

  createWithdrawal(retiro:Retiro){
    return this.http.post<Retiro>(this.baseUrl+'transaccion',retiro);
  }

  createDeposit(deposito:Deposito){
    return this.http.post<Deposito>(this.baseUrl+'transaccion',deposito);
  }

}