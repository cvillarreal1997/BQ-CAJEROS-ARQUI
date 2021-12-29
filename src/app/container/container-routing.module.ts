import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DepositoComponent } from '../components/deposito/deposito.component';
import { InformacionComponent } from '../components/informacion/informacion.component';
import { RetiroComponent } from '../components/retiro/retiro.component';
import { TransaccionComponent } from '../components/transaccion/transaccion.component';
import { TransaccionpComponent } from '../components/transaccionp/transaccionp.component';

const routes: Routes = [
  { path: 'info', component: InformacionComponent, outlet: 'system' },
  { path: 'cuote-payment', component: TransaccionpComponent, outlet: 'system' },
  { path: 'credit-payment', component: TransaccionComponent, outlet: 'system' },
  { path: 'withdrawal', component: RetiroComponent, outlet: 'system' },
  { path: 'deposit', component: DepositoComponent, outlet: 'system' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
