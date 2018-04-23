import { Component, OnInit } from '@angular/core';
import { MovieFetcherService } from '../shared/moviefetcher.service';
import { FormControl } from '@angular/forms';
import { distinct, debounceTime, distinctUntilChanged, switchMap, tap } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { Movie } from '../shared/movie';

@Component({
  selector: 'smx-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public searchTerm: FormControl;
  public loading: boolean;
  public movies: Movie[];
  public upcomingMovies: Movie[];

  constructor(private movieFetcher: MovieFetcherService) {  
    this.searchTerm = new FormControl();
    this.loading = false;
   }

  ngOnInit() {

    this.searchTerm.valueChanges.pipe(
      debounceTime(400), 
      distinctUntilChanged(),      
      tap(_ => this.loading = true),
      switchMap(term => this.movieFetcher.getMoviesBySearch(term)),    
    ).subscribe(      
      returnedMovies => 
      {       
        this.movies = returnedMovies;
        this.loading = false;
      },
      err => console.error(err)
    )

   
  }

  onEnter(term: string)
  {
    console.log(`Searching for: ${term}`);
  }

   searchMovies(searchTerm: string)
   {
     console.log(`Searching for: ${searchTerm}`);
   }
  //   let results = this.movieFetcher.getMoviesBySearch()
  // )

}
