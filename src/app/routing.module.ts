import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';
import { UpcomingComponent } from './upcoming/upcoming.component';
import { AboutComponent } from './about/about.component';

const routes: Routes = [
  {path: '', component: HomeComponent, pathMatch: 'full'},   
  {path: 'home', component: HomeComponent},
  {path: 'search', component: HomeComponent},
  {path: 'movie/:id', component: MovieDetailComponent}, 
  {path: 'upcoming', component: UpcomingComponent},
  {path: 'about', component: AboutComponent},
  {path: '**', component: HomeComponent}, //if none matches above...
]

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})], //Use HashLocationStrategy
  exports: [RouterModule]
})
export class RoutingModule { }
