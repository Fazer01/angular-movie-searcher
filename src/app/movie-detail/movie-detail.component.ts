import { Component, OnInit, HostBinding } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieFetcherService } from '../shared/moviefetcher.service';
import { MovieDetail } from '../shared/movie-details/movie-detail';
import { MovieVideo } from '../shared/movie-details/movie-video';
import { DomSanitizer } from '@angular/platform-browser';
import { Cast } from '../shared/movie-credits/movie-credits';

@Component({
  selector: 'smx-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css'],
})
export class MovieDetailComponent implements OnInit {

  public movieDetail: MovieDetail;
  public movieVideos: MovieVideo[];
  public movieCast: Cast[];

  constructor(private activatedRoute: ActivatedRoute, private movieFetcher: MovieFetcherService, private sanitizer: DomSanitizer) 
  {     
   
  }
 
  ngOnInit() {
    this.activatedRoute.params.subscribe((params) =>
    {
      //Start fetching moviedata
      const id = params['id'];        
      this.movieFetcher.getMovieByID(id).subscribe(results => 
        { 
          this.movieDetail = results;
          
        }, 
        err => console.error(err)
      );          
     
      this.movieFetcher.getVideoForMovieById(id).subscribe(videos => 
      {   
        for(let video of videos){
          video.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + video.key);
        }
        
        this.movieVideos = videos;  
      }, 
      err => console.error(err)); 

      this.movieFetcher.getMovieCredits(id).subscribe( results => 
      {
        console.log(results);
        console.log(`Name: ${results.cast[0].name}; Character: ${results.cast[0].character}`);
        this.movieCast = results.cast.splice(0, 4);

      },
      err => console.error(err))

    });
  }
}
