import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DepositoComponent } from './components/deposito/deposito.component';
import { InformacionComponent } from './components/informacion/informacion.component';
import { AutentificacionComponent } from './components/autentificacion/autentificacion.component';
import { TransaccionpComponent } from './components/transaccionp/transaccionp.component';
import { TransaccionComponent } from './components/transaccion/transaccion.component';
import { RetiroComponent } from './components/retiro/retiro.component';
import { ContainerComponent } from './container/container.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: AutentificacionComponent},
  {
    path: 'system',
    component: ContainerComponent,
    children: [
      { path: '', redirectTo: 'info', pathMatch: 'full' },
      { path: 'info', component: InformacionComponent },
      { path: 'cuote-payment', component: TransaccionpComponent },
      { path: 'credit-payment', component: TransaccionComponent },
      { path: 'withdrawal', component: RetiroComponent },
      { path: 'deposit', component: DepositoComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
