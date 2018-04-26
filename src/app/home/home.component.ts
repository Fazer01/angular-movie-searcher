import { Component, OnInit, OnDestroy } from '@angular/core';
import { MovieFetcherService } from '../shared/moviefetcher.service';
import { FormControl, FormBuilder } from '@angular/forms';
import { distinct, debounceTime, distinctUntilChanged, switchMap, tap } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { Movie } from '../shared/movie';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'smx-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  public searchTerm: FormControl;
  public loading: boolean;
  public movies: Movie[];
  public upcomingMovies: Movie[];

  private searchTermSub: Subscription;

  constructor(private movieFetcher: MovieFetcherService, private formBuilder: FormBuilder) {  
    this.searchTerm = new FormControl();
    this.loading = false;
   }

   ngOnDestroy()
   {
     this.searchTermSub.unsubscribe();
   }
  
  ngOnInit() {

    this.searchTermSub = this.searchTerm.valueChanges.pipe(
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
