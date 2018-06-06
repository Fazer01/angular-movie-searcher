import { Component, OnInit } from '@angular/core';
import { MovieFetcherService } from '../shared/moviefetcher.service';
import { FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { distinct, debounceTime, distinctUntilChanged, switchMap, tap, finalize } from 'rxjs/operators';
import { Observable,  Subscription } from 'rxjs';
import { Movie } from '../shared/movie';

@Component({
  selector: 'smx-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public searchForm: FormGroup;
  public loading: boolean;
  public movies$: Observable<Movie[]>;

  constructor(private movieFetcher: MovieFetcherService, private formBuilder: FormBuilder) {  

    this.searchForm = this.formBuilder.group({
      searchTerm: ''
    })
    this.loading = false;
   }
  
  ngOnInit() {
    this.movies$ = this.searchForm.get('searchTerm').valueChanges.pipe(
      debounceTime(400), 
      distinctUntilChanged(),      
      tap(_ => this.loading = true),
      switchMap(term => this.movieFetcher.getMoviesBySearch(term)),      
      tap( ()=> this.loading = false)    
    )
  }    
}
