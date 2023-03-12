import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { LinhasComponent } from './pages/linhas/linhas.component';
import { ItinerariosComponent } from './pages/itinerarios/itinerarios.component';
import { EmpresasComponent } from './pages/empresas/empresas.component';
import { PosicaoComponent } from './pages/posicao/posicao.component';
import { MapaComponent } from './pages/mapa/mapa.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    LinhasComponent,
    ItinerariosComponent,
    EmpresasComponent,
    PosicaoComponent,
    MapaComponent
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    MatInputModule,
    MatFormFieldModule,
    MatProgressSpinnerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
