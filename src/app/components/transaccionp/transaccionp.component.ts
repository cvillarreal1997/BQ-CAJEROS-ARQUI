import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ClientsService } from 'src/app/Service/client.service';
import { LoanService } from 'src/app/Service/loan.service';
import { Client } from 'src/Model/Client';
import { Loan, Quota } from 'src/Model/Loan';

@Component({
  selector: 'app-transaccionp',
  templateUrl: './transaccionp.component.html',
  styleUrls: ['./transaccionp.component.css'],
  providers: [MessageService],
  host: {
    '(document:keypress)': 'handleKeyboardEvent($event)',
  }
})
export class TransaccionpComponent implements OnInit {
  
  identification!: string;
  monto!: number;
  debtLoans = new Array();
  clientSelectedLoanIndex!: number;
  clientSelectedLoan!: Loan;
  client!: Client;
  quotas = new Array();
  selectedQuotas = new Array();
  constructor(
    private messageService: MessageService,
    private clientService: ClientsService,
    private loanService: LoanService
  ) {}

  ngOnInit(): void {
    this.limpiar();
  }

  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key == '*')
      this.limpiar();    
  }

  limpiar() {
    this.identification = '';
    this.monto = 0.00;
    this.debtLoans = new Array();
    this.client = new Client();
    this.clientSelectedLoanIndex = 0;
    this.quotas = new Array();
    this.clientSelectedLoan = new Loan();    
    this.selectedQuotas = new Array();
  }

  onIdentification() {
    this.clientService.getClient('CED', this.identification).subscribe(
      (res) => {
        console.log('CLIENTE IDENTIFICADO: ' + JSON.stringify(res));
        let result:any = { ...res };        
        this.client = {
          id: result.id,
          tipoIdentificacion: result.tipoIdentificacion,
          identificacion: result.identificacion,
          apellidoPaterno: result.apellidoPaterno,
          apellidoMaterno: result.apellidoMaterno,
          nombre1: result.nombre1,
          nombre2: result.nombre2,
          provincia: result.provincia,
          canton: result.canton,
          parroquia: result.parroquia,
          direccion: result.direccion,
          telefono: result.telefono,
          email: result.email,
          fechaNacimiento: result.fechaNacimiento,
          estadoCivil: result.estadoCivil,
          estadoBancaWeb: result.estadoBancaWeb,
          estado: result.estado
        }        
        this.getPrestamo(this.client.id);
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

  getPrestamo(clientId: string) {
    this.loanService.getClientLoan(clientId).subscribe(
      (res) => {
        let response:any = {...res}
        for(let loanItem of Object.keys(response)){
          console.log(response[loanItem]);
          if(response[loanItem].estado == "PEN" || response[loanItem].estado == "NDS" || response[loanItem].estado == "DES"){
            this.debtLoans.push(response[loanItem]);
          }
        }
        this.setLoan();
        console.log(this.debtLoans);
        console.log(this.client);
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

  setLoan() {
    console.log(this.debtLoans);        
    console.log(this.debtLoans[this.clientSelectedLoanIndex]);
    console.log("PRESTAMO:"+this.debtLoans[this.clientSelectedLoanIndex].prestamo);
    this.clientSelectedLoan = {
      codigo: this.debtLoans[this.clientSelectedLoanIndex].codigo,
      codigoCliente: this.debtLoans[this.clientSelectedLoanIndex].codigoCliente,
      estado: this.debtLoans[this.clientSelectedLoanIndex].estado,
      fechaFin: this.debtLoans[this.clientSelectedLoanIndex].fechaFin,
      fechaInicio: this.debtLoans[this.clientSelectedLoanIndex].fechaInicio,
      monto: this.debtLoans[this.clientSelectedLoanIndex].monto,
      montoSeguro: this.debtLoans[this.clientSelectedLoanIndex].montoSeguro,
      plazo: this.debtLoans[this.clientSelectedLoanIndex].plazo,
      prestamo: this.debtLoans[this.clientSelectedLoanIndex].prestamo,
      saldoCapital: this.debtLoans[this.clientSelectedLoanIndex].saldoCapital,
      segDesgravamen: this.debtLoans[this.clientSelectedLoanIndex].segDesgravamen,
      valorTotalInteres: this.debtLoans[this.clientSelectedLoanIndex].valorTotalInteres,      
    }
    this.getQuotes();
  }

  getQuotes(){
    this.quotas = new Array();
    this.loanService.getQuotes(this.clientSelectedLoan.codigo).subscribe(
      (res) => {
        let response: any = {...res}
        let cuota = new Quota();
        for(let quote of Object.keys(response)){
          cuota = {
            anio: response[quote].anio,
            capital: response[quote].capital,
            codigo: response[quote].codigo,
            cuota: response[quote].cuota,
            codigoPrestamo: response[quote].codigoPrestamo,
            cuotaInteres: response[quote].cuotaInteres,
            cuotaSeguro: response[quote].cuotaSeguro,
            estado: response[quote].estado,
            fechaMaxPago: new Date(response[quote].fechaMaxPago),
            fechaPago: new Date(response[quote].fechaPago),
            mes: response[quote].mes,
            saldoActual: response[quote].saldoActual,
            saldoAnterior: response[quote].saldoAnterior,
            valorPago: response[quote].valorPago
          }
          this.quotas.push(cuota);
        }
        console.log(this.quotas);
      }, 
      (err) => {

      }
    );
  }

  public inputNumberValidator(event: any) {
    const pattern = /^[0-9]*$/;
    if (!pattern.test(event.target.value)) {
      event.target.value = event.target.value.replace(/[^0-9]/g, '');
    }
  }
  
  mountCalc(checked: boolean){    
    console.log(this.selectedQuotas);
    var mounts = new Array();
    this.selectedQuotas.forEach(element => mounts.push(parseFloat(element.split(';')[1])));
    this.monto = mounts.reduce((partial_sum, a) => partial_sum + a, 0); 
    this.monto = parseFloat(this.monto.toFixed(2));
  }

  enviar(){
    console.log("enviar");    
    var body: any;
    for(let i = 0; i < this.selectedQuotas.length; i++){
      body = {
        codigo: this.selectedQuotas[i].split(';')[0],
        codigoPrestamo: this.clientSelectedLoan.codigo,
        valorPago: this.selectedQuotas[i].split(';')[1]
      }
      console.log(body);
      this.payCuota(body);
    }    
  }

  payCuota(cuota: any){
    this.loanService.payQuote(cuota).subscribe(
      (res) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Éxito',
          detail: "Pago registrado",
        });
        this.limpiar();
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
