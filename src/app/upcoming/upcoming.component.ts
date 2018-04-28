import { Component, OnInit } from '@angular/core';
import { MovieFetcherService } from '../shared/moviefetcher.service';
import { Movie } from '../shared/movie';
import { Observable } from 'rxjs/Observable';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'smx-upcoming',
  templateUrl: './upcoming.component.html',
  styleUrls: ['./upcoming.component.css']
})
export class UpcomingComponent implements OnInit {

  public loading: boolean;
  public upcomingMovies$: Observable<Movie[]>;

  constructor(private movieFetcher: MovieFetcherService) { }

  ngOnInit() {

    this.loading = true;
    this.upcomingMovies$ = this.movieFetcher.getUpcomingMovies().pipe(
      tap(() => this.loading = false)
    )     
  }

}
