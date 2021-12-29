import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import {FormsModule,ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { AutentificacionComponent } from './components/autentificacion/autentificacion.component'
import { SharedModule } from './shared/shared.module';
import { TransaccionComponent } from './components/transaccion/transaccion.component';
import { InformacionComponent } from './components/informacion/informacion.component';
import { RetiroComponent } from './components/retiro/retiro.component';
import { DepositoComponent } from './components/deposito/deposito.component';
import { TransaccionpComponent } from './components/transaccionp/transaccionp.component';
import { HttpClientModule } from '@angular/common/http';
import {ToastModule} from 'primeng/toast';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FooterComponent } from './shared/footer/footer.component';
import { ContainerComponent } from './container/container.component';
import {TabMenuModule} from 'primeng/tabmenu';
import {CheckboxModule} from 'primeng/checkbox';

@NgModule({
  declarations: [
    AppComponent,
    TransaccionComponent,
    InformacionComponent,
    RetiroComponent,
    DepositoComponent,
    TransaccionpComponent,
    AutentificacionComponent,
    FooterComponent,
    ContainerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastModule,
    BrowserAnimationsModule,
    TabMenuModule    ,
    CheckboxModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }