import { Component, OnInit } from '@angular/core';
import { MovieFetcherService } from '../shared/moviefetcher.service';
import { Movie } from '../shared/movie';
import {UpcomingMovies} from '../shared/movie-upcoming/movie-upcoming'
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'smx-upcoming',
  templateUrl: './upcoming.component.html',
  styleUrls: ['./upcoming.component.css']
})
export class UpcomingComponent implements OnInit {

  public loading: boolean;
  public upcomingMovies: Movie[];
  public total_results: number;
  public total_pages: number;
  public currentPage: number;
  public readonly MAX_PAGE_SIZE: number = 20;
  constructor(private movieFetcher: MovieFetcherService) { }

  ngOnInit() {
    this.loading = true;
    this.movieFetcher.getUpcomingMovies(1).subscribe((results: UpcomingMovies) => {
      console.log(results);
      this.upcomingMovies = results.results;
      this.total_results = results.total_results;
      this.total_pages = results.total_pages;
      //this.currentPage = results.page;
      this.loading = false;
    });
  }

  onPageChange(page) {
    this.loading = true;
    this.movieFetcher.getUpcomingMovies(page).subscribe((results: UpcomingMovies) => {
      console.log(results);
      this.upcomingMovies = results.results;
      this.total_results = results.total_results;
      this.total_pages = results.total_pages;
      this.currentPage = results.page;      
      this.loading = false;
    });
  }  
}

