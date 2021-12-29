import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { CardService } from 'src/app/Service/card.service';
import { ClientsService } from 'src/app/Service/client.service';
import { ProcessService } from 'src/app/Service/process.service';

@Component({
  selector: 'app-transaccion',
  templateUrl: './transaccion.component.html',
  styleUrls: ['./transaccion.component.css'],
  providers: [MessageService],
  host: {
    '(document:keypress)': 'handleKeyboardEvent($event)',
  },
})
export class TransaccionComponent implements OnInit {
  identification!: string;
  tarjeta!: string;
  deuda!: number;
  statusId!: string;
  minimo!: number;
  monto!: number;
  cardId!: string;

  constructor(
    private messageService: MessageService,
    private clientService: ClientsService,
    private cardsService: CardService,
    private processService: ProcessService
  ) {}

  ngOnInit(): void {}

  onIdentification() {
    this.clientService.getClient('CED', this.identification).subscribe(
      (res) => {
        console.log('CLIENTE IDENTIFICADO: ' + JSON.stringify(res));
        let clientIdentified: any = { ...res };
        this.getCard(clientIdentified.id);
        this.cardStatus(this.cardId);
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

  onCarNumber() {
    this.cardsService.getCard(this.tarjeta).subscribe(
      (res) => {
        let response: any = { ...res };
        this.cardStatus(response.codTarjetaCliente);
        this.cardId = response.codTarjetaCliente;
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

  getCard(clientId: string) {
    this.cardsService.getClientCard(clientId).subscribe(
      (res) => {
        let response: any = { ...res };
        this.cardId = response.codTarjetaCliente;
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

  verificar() {
    if (this.tarjeta == null && this.identification != null) {
      this.onIdentification();
    } else {
      this.onCarNumber();
    }
  }

  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key == '*') {
      this.limpiar();
    }
  }

  limpiar() {
    this.tarjeta = '';
    this.identification = '';
    this.deuda = 0;
    this.monto = 0;
    this.statusId = '';
    this.minimo = 0;
  }

  enviar() {
    console.log(this.monto);
    var paymentType = '';
    if (this.monto == this.minimo) {
      paymentType = 'minimumPayment';
      this.pay(this.statusId, paymentType);
    } else if (this.monto == this.deuda) {
      paymentType = 'totalPayment';
      this.pay(this.statusId, paymentType);
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Sólo puede pagar la deuda total o mínima',
      });
    }
  }

  pay(id: string, type: string) {
    this.processService.payCardStatus(id, type).subscribe(
      (res) => {
        this.payTransaction(this.cardId, this.monto);
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

  cardStatus(clientCardId: string) {
    this.processService.getCardStatus(clientCardId).subscribe(
      (res) => {
        let cardStatus: any = { ...res };
        var size = Object.keys(cardStatus).length;
        for (let accountStatus of Object.keys(cardStatus)) {
          size--;
          if (cardStatus[accountStatus].state === 'Pending') {            
            size++;
            this.deuda = cardStatus[accountStatus].pendingAmount.toFixed(2);
            this.minimo = cardStatus[accountStatus].minimumPayment.toFixed(2);
            this.statusId = cardStatus[accountStatus].id;
          }
          if(size == 0){
            this.messageService.add({
              severity: 'warn',
              summary: 'Atención',
              detail: 'No tiene estados de cuenta pendientes',
            });
          }
        }
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

  payTransaction(id: string, monto: number) {
    var obj = {
      codTarjetaCliente: id,
      descripcion: 'Pago de tarjeta',
      monto: monto,
      tipo: 'PAG',
    };
    this.cardsService.cardTransaction(obj).subscribe(
      (res) => {
        console.log(res);
        this.messageService.add({
          severity: 'success',
          summary: 'Éxtito',
          detail: 'El pago se ha realizado',
        });
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
}
