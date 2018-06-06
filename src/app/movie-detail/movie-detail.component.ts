import { Component, OnInit, HostBinding } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieFetcherService } from '../shared/moviefetcher.service';
import { MovieDetail } from '../shared/movie-details/movie-detail';
import { MovieVideo } from '../shared/movie-details/movie-video';
import { DomSanitizer } from '@angular/platform-browser';
import { Cast, MovieCredits } from '../shared/movie-credits/movie-credits';
import { Subscription , forkJoin ,  Observable } from 'rxjs';
import {map, switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'smx-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css'],
})
export class MovieDetailComponent implements OnInit {

  public movieDetail$: Observable<MovieDetail>;
  public movieVideos$: Observable<MovieVideo[]>;
  public movieCast$: Observable<Cast[]>;

  private routeSub: Subscription;
  private movieIDSub: Subscription; 
  private movieCreditsSub: Subscription;
  private movieVideoSub: Subscription;

  constructor(private activatedRoute: ActivatedRoute, private movieFetcher: MovieFetcherService, private sanitizer: DomSanitizer) 
  {
  }
 
  ngOnInit() {
    
    //1. Fetch the moviedetails by the movie id
    this.movieDetail$ = this.activatedRoute.params.pipe(
      map(params => params['id']),
      switchMap((id:number) => this.movieFetcher.getMovieByID(id))
      );                

    //2. Fetch the movievideos by the movie id
    this.movieVideos$ = this.activatedRoute.params.pipe(
      map(params => params['id']),
      switchMap((id:number) => this.movieFetcher.getVideoForMovieById(id)),
      map( (results:MovieVideo[]) => {
        for(let video of results)
        {
          video.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + video.key);
        }
        return results;
      })      
    );   
    //3. Fetch the cast by the movie id
    this.movieCast$ = this.activatedRoute.params.pipe(
      map(params => params['id']),  
      switchMap((id:number) => this.movieFetcher.getMovieCredits(id)),
      map ( (results:MovieCredits) => {
         return results.cast.splice(0, 4);
       })      
    );   
  }
}
    
