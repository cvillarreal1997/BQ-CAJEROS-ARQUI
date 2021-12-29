import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ClientsService } from 'src/app/Service/client.service';
import { ProductsService } from 'src/app/Service/products.service';
import { Retiro } from '../../../Model/Retiro';

@Component({
  selector: 'app-retiro',
  templateUrl: './retiro.component.html',
  styleUrls: ['./retiro.component.css'],
  providers: [MessageService],
  host: {
    '(document:keypress)': 'handleKeyboardEvent($event)',
  },
})
export class RetiroComponent implements OnInit {
  retiroSave!: Retiro;
  accounts: any = [];
  currentBalance: string = '';
  identification: string = '';
  @ViewChild('cedula') private cedula!: ElementRef;
  @ViewChild('cuenta') private cuenta!: ElementRef;
  @ViewChild('saldo') private saldo!: ElementRef;
  @ViewChild('monto') private monto!: ElementRef;

  constructor(
    private messageService: MessageService,
    private clientService: ClientsService,
    private productsService: ProductsService
  ) {}

  ngOnInit(): void {
    this.retiroSave = new Retiro();
  }

  limpiar() {
    this.retiroSave = new Retiro();
    this.accounts = [];
    this.cedula.nativeElement.value = '';
    this.cuenta.nativeElement.value = '';
    this.saldo.nativeElement.value = '';
    this.monto.nativeElement.value = '';
  }

  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key == '*') {
      this.limpiar();
    }
  }

  getAccountTab(event: any) {}

  verificar() {
    console.log('ident:' + this.identification);
    console.log('cuenta:' + this.retiroSave.cuentaId);
    if (this.identification == '' && this.retiroSave.cuentaId != null) {
      this.getProduct(this.retiroSave.cuentaId);
    } else if (this.identification != '' && this.retiroSave.cuentaId == null) {
      this.getClient();
    } else if (this.identification != '' && this.retiroSave.cuentaId != null) {
      this.getProduct(this.retiroSave.cuentaId);
    }
  }

  getClient() {
    this.clientService.getClient('CED', this.identification).subscribe(
      (res) => {
        console.log('CLIENTE IDENTIFICADO: ' + JSON.stringify(res));
        let clientIdentified: any = { ...res };
        this.getAccounts(clientIdentified.id);
      },
      (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Cliente no encontrado',
        });
      }
    );
  }

  getAccounts(id: string) {
    this.productsService.obtainProducts(id).subscribe(
      (res) => {
        console.log('PRODUCTOS: ' + JSON.stringify(res));
        var products: any = { ...res };
        if (!products[0]) {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'El cliente no tiene cuentas para realizar el retiro',
          });
        } else {
          for (let product of Object.keys(products)) {
            console.log(products[product]);
            var type =
              products[product].productoPasivo.codProductoPasivo == 'GAN'
                ? 'Cuenta ganadiario'
                : 'Cuenta ahorros';
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
        }
      },
      (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'El cliente no tiene cuentas para realizar el retiro',
        });
      }
    );
  }

  getProduct(accId: String) {
    this.productsService.obtainOneProduct(accId).subscribe(
      (res) => {
        console.log('PRODUCTOS: ' + JSON.stringify(res));
        var product: any = { ...res };
        var type =
          product.productoPasivo.codProductoPasivo == 'GAN'
            ? 'Cuenta ganadiario'
            : 'Cuenta ahorros';
        var productObj = {
          cuentaTipo: type,
          cuentaId: product.cuentaId,
          saldo: product.saldoDisponible,
        };
        console.log(productObj);
        this.accounts.push(productObj);
        console.log('CUENTA:' + JSON.stringify(this.accounts[0]));
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

  enviar() {
    this.productsService.createWithdrawal(this.retiroSave).subscribe(
      (res) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Retiro',
          detail: 'Registrado exitosamente',
        });
        this.limpiar();
      },
      (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Retiro',
          detail: err.error.detail,
        });
      }
    );
    console.log('RETIRO:' + JSON.stringify(this.retiroSave));
  }

  public inputNumberValidator(event: any) {
    const pattern = /^[0-9]*$/;
    if (!pattern.test(event.target.value)) {
      event.target.value = event.target.value.replace(/[^0-9]/g, '');
    }
  }

  public inputDecimaValidator(event: any) {
    const pattern = /^([0-9]+\.?[0-9]*|\.[0-9]+)$/;
    if (!pattern.test(event.target.value)) {
      event.target.value = event.target.value.replace(/[^0-9]/g, '');
    }
  }

  validadorDeCedula(cedula: String): any {
    if (cedula.length == 10) {
      let tercerDigito = parseInt(cedula.substring(2, 3));
      if (tercerDigito < 6) {
        // El ultimo digito se lo considera dígito verificador
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
