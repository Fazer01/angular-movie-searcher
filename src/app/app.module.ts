import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { RoutingModule } from './/routing.module';
import { HomeComponent } from './home/home.component';
import { NavigationComponent } from './navigation/navigation.component';
import { MovieFetcherService } from './shared/moviefetcher.service';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { MovieComponent } from './movie/movie.component';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';
import { UpcomingComponent } from './upcoming/upcoming.component';
import { AboutComponent } from './about/about.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,  
    NavigationComponent, 
    MovieComponent, 
    MovieDetailComponent, UpcomingComponent, AboutComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RoutingModule, 
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule, 
  ],
  providers: [MovieFetcherService, FormBuilder],
  bootstrap: [AppComponent]
})
export class AppModule { }
