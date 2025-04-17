import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminComponent } from './pages/admin/admin.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './pages/home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DetailsComponent } from './pages/details/details.component';
import { CardComponent } from './components/card/card.component';
import { SearchbarComponent } from './components/searchbar/searchbar.component';
import { AddcarComponent } from './pages/addcar/addcar.component';
import { EditcarComponent } from './pages/editcar/editcar.component';
import { CarAnimationComponent } from './components/car-animation/car-animation.component';
import { FullCalendarModule } from '@fullcalendar/angular';

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    DetailsComponent,
    CardComponent,
    SearchbarComponent,
    AddcarComponent,
    EditcarComponent,
    CarAnimationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FullCalendarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
