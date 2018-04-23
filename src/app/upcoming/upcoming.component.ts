import { Component, OnInit } from '@angular/core';
import { MovieFetcherService } from '../shared/moviefetcher.service';
import { Movie } from '../shared/movie';

@Component({
  selector: 'smx-upcoming',
  templateUrl: './upcoming.component.html',
  styleUrls: ['./upcoming.component.css']
})
export class UpcomingComponent implements OnInit {

  public loading: boolean;
  public upcomingMovies: Movie[];

  constructor(private movieFetcher: MovieFetcherService) { }

  ngOnInit() {

    this.loading = true;
    this.movieFetcher.getUpcomingMovies().subscribe( results =>
      {
        this.upcomingMovies = results;
        console.log(this.upcomingMovies);
        this.loading = false;
      }
    )
  }

}
