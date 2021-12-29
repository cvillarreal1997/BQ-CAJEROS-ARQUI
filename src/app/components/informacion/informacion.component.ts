import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ClientsService } from 'src/app/Service/client.service';
import { ProductsService } from 'src/app/Service/products.service';
import { Client } from 'src/Model/Client';
import { Retiro } from 'src/Model/Retiro';

@Component({
  selector: 'app-informacion',
  templateUrl: './informacion.component.html',
  styleUrls: ['./informacion.component.css'],
  providers: [MessageService],
})
export class InformacionComponent implements OnInit {
  identification!: string;
  client!: Client;
  retiroSave!: Retiro;
  accounts: any = [];
  validador: boolean = false;

  constructor(
    private messageService: MessageService,
    private clientService: ClientsService,
    private productsService: ProductsService
  ) {}

  ngOnInit(): void {
    this.retiroSave = new Retiro();
    this.client = new Client();
  }

  getClient() {
    this.client = new Client();
    this.accounts = [];
    this.clientService.getClient('CED', this.identification).subscribe(
      (res) => {
        console.log('CLIENTE IDENTIFICADO: ' + JSON.stringify(res));
        let clientIdentified: any = { ...res };
        this.client = {
          id: clientIdentified.id,
          tipoIdentificacion: clientIdentified.tipoIdentificacion,
          identificacion: clientIdentified.identificacion,
          apellidoPaterno: clientIdentified.apellidoPaterno,
          apellidoMaterno: clientIdentified.apellidoMaterno,
          nombre1: clientIdentified.nombre1,
          nombre2: clientIdentified.nombre2,
          provincia: clientIdentified.provincia,
          canton: clientIdentified.canton,
          parroquia: clientIdentified.parroquia,
          direccion: clientIdentified.direccion,
          telefono: clientIdentified.telefono,
          email: clientIdentified.email,
          fechaNacimiento: new Date(clientIdentified.fechaNacimiento),
          estadoCivil: clientIdentified.estadoCivil,
          estadoBancaWeb: clientIdentified.estadoBancaWeb,
          estado: clientIdentified.estado,
        };
        this.getAccounts(this.client.id);
      },
      (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: err.error.detail,
        });
      }
    );
  }

  getAccounts(id: string) {
    this.productsService.obtainProducts(id).subscribe(
      (res) => {
        console.log('PRODUCTOS: ' + JSON.stringify(res));
        var products: any = { ...res };
        for (let product of Object.keys(products)) {
          console.log(products[product]);
          var type =
            products[product].productoPasivo.codProductoPasivo == 'GAN'
              ? 'Ahorros'
              : 'Ganadiario';
          var productObj = {
            cuentaTipo: type,
            cuentaId: products[product].cuentaId,
            saldo: products[product].saldoDisponible,
          };
          console.log(productObj);
          this.accounts.push(productObj);
        }
        console.log('AHORRO:' + JSON.stringify(this.accounts[0]));
        console.log('GANADIARIO:' + JSON.stringify(this.accounts[1]));
      },
      (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: err.error.detail,
        });
      }
    );
  }
  public inputValidator(event: any) {
    const pattern = /^[0-9]*$/;
    if (!pattern.test(event.target.value)) {
      event.target.value = event.target.value.replace(/[^0-9]/g, '');
    }
  }

  validadorDeCedula(cedula: String) {
    if (cedula.length == 10) {
      let tercerDigito = parseInt(cedula.substring(2, 3));
      if (tercerDigito < 6) {
        let coefValCedula = [2, 1, 2, 1, 2, 1, 2, 1, 2];
        let verificador = parseInt(cedula.substring(9, 10));
        let suma: number = 0;
        let digito: number = 0;
        for (let i = 0; i < cedula.length - 1; i++) {
          digito = parseInt(cedula.substring(i, i + 1)) * coefValCedula[i];
          suma += parseInt((digito % 10) + '') + parseInt(digito / 10 + '');
        }
        suma = Math.round(suma);
        if (
          Math.round(suma % 10) == 0 &&
          Math.round(suma % 10) == verificador
        ) {
          return true;
        } else if (10 - Math.round(suma % 10) == verificador) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
}
