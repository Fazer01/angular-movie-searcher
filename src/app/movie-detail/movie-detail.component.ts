import { Component, OnInit, HostBinding, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieFetcherService } from '../shared/moviefetcher.service';
import { MovieDetail } from '../shared/movie-details/movie-detail';
import { MovieVideo } from '../shared/movie-details/movie-video';
import { DomSanitizer } from '@angular/platform-browser';
import { Cast } from '../shared/movie-credits/movie-credits';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'smx-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css'],
})
export class MovieDetailComponent implements OnInit, OnDestroy {

  public movieDetail: MovieDetail;
  public movieVideos: MovieVideo[];
  public movieCast: Cast[];

  private routeSub: Subscription;
  private movieIDSub: Subscription;
  private movieCreditsSub: Subscription;
  private movieVideoSub: Subscription;

  constructor(private activatedRoute: ActivatedRoute, private movieFetcher: MovieFetcherService, private sanitizer: DomSanitizer) 
  {     

    
   
  }

  ngOnDestroy()
  {
    this.routeSub.unsubscribe(); 
    this.movieIDSub.unsubscribe(); 
    this.movieCreditsSub.unsubscribe(); 
    this.movieVideoSub.unsubscribe();     
  }
 
  ngOnInit() {
    this.routeSub = this.activatedRoute.params.subscribe((params) =>
    {
      //Start fetching moviedata
      const id = params['id'];        
      this.movieIDSub = this.movieFetcher.getMovieByID(id).subscribe(results => 
        { 
          this.movieDetail = results;
          
        }, 
        err => console.error(err)
      );          
     
      this.movieVideoSub = this.movieFetcher.getVideoForMovieById(id).subscribe(videos => 
      {   
        for(let video of videos){
          video.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + video.key);
        }
        
        this.movieVideos = videos;  
      }, 
      err => console.error(err)); 

      this.movieCreditsSub = this.movieFetcher.getMovieCredits(id).subscribe( results => 
      {
        console.log(results);
        console.log(`Name: ${results.cast[0].name}; Character: ${results.cast[0].character}`);
        this.movieCast = results.cast.splice(0, 4);

      },
      err => console.error(err))

    });
  }
}
