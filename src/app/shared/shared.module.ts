import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CabeceraComponent } from './cabecera/cabecera.component';
import { AppRoutingModule } from '../app-routing.module';



@NgModule({
  declarations: [
    CabeceraComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule
  ], 
  exports:[CabeceraComponent ]
})
export class SharedModule { }
