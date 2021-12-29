export class Loan {
  codigo: string = '';
  codigoCliente: string = '';
  estado: string = '';
  fechaFin!: Date;
  fechaInicio!: Date;
  monto: number = 0;
  montoSeguro: number = 0;
  plazo: number = 0;
  prestamo = {
    codigo: '',
    nombre: '',
    prestamosTasa: 0,
  };
  saldoCapital: number = 0;
  segDesgravamen: string = '';
  valorTotalInteres: number = 0;
}

export class Quota {
    anio!: string
    capital!: string
    codigo!: string
    codigoPrestamo!: string
    cuota!: string
    cuotaInteres!: string
    cuotaSeguro!: string
    estado!: string
    fechaMaxPago!: Date
    fechaPago!: Date
    mes!: string
    saldoActual!: string
    saldoAnterior!: string
    valorPago!: string
}