import { Injectable } from '@angular/core';
import { HttpHeaders, HttpParams, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { tap, catchError, map } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { Movie } from './movie';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { RootResult } from './rootresult';
import { MovieDetail } from './movie-details/movie-detail';
import { MovieVideo } from './movie-details/movie-video';
import { MovieVideoResult } from './movie-details/movie-video-result';
import { MovieCredits } from './movie-credits/movie-credits';
import { UpcomingMovies } from './movie-upcoming/movie-upcoming';

const httpHeaders = {
  headers: new HttpHeaders({       
    'Content-Type': 'application/json'
  })
}

@Injectable()
export class MovieFetcherService {

  private apiKey: string = '6545279e0de20ff3691b0fdc6e99c188';
  private baseSearchMovieUrl: string = 'https://api.themoviedb.org/3/search/movie';
  private baseSearchMovieByIDUrl: string = 'https://api.themoviedb.org/3/movie';    
  private httpOptions: HttpHeaders; 

  constructor(private http: HttpClient) { }

  getVideoForMovieById(movieId: number): Observable<MovieVideo>{
    if(movieId < 0 || movieId === null)
    {
      return of(null);
    }

    let searchParams = new HttpParams();
    // Begin assigning parameters
    searchParams = searchParams.append('api_key', this.apiKey);

    return this.http.get<MovieVideoResult>(`${this.baseSearchMovieByIDUrl}/${movieId}/videos`,{headers: httpHeaders.headers, params: searchParams}).pipe(     
      map((results:MovieVideoResult) => {
        let video = results.results[0];
        return new MovieVideo(video.id, video.iso_639_1, video.iso_3166_1, video.key, video.name, video.site, video.size, video.type);
      }),
    )
  }

  getUpcomingMovies(): Observable<Movie[]>{
    let searchParams = new HttpParams();
    // Begin assigning parameters
    searchParams = searchParams.append('api_key', this.apiKey);
    return this.http.get<Movie[]>(`${this.baseSearchMovieByIDUrl}/upcoming`, {headers: httpHeaders.headers, params: searchParams}).pipe(
      map((results:any) => {return results.results} ), 
      catchError(this.handleError)
    )
  }

  getMovieByID(movieId: number): Observable<MovieDetail>
  {
    if(movieId < 0 || movieId === null)
    {
      return of(null);
    }

    let searchParams = new HttpParams();
    // Begin assigning parameters
    searchParams = searchParams.append('api_key', this.apiKey);

    return this.http.get<MovieDetail>(`${this.baseSearchMovieByIDUrl}/${movieId}`,{headers: httpHeaders.headers, params: searchParams}).pipe(     
      map( movieDetail  => {
          return new MovieDetail(movieDetail.adult, movieDetail.backdrop_path, movieDetail.belongs_to_collection, movieDetail.budget, movieDetail.genres, movieDetail.homepage, movieDetail.id, 
            movieDetail.imdb_id, movieDetail.original_language, movieDetail.original_title, movieDetail.overview, movieDetail.popularity, movieDetail.poster_path, movieDetail.production_companies, 
          movieDetail.production_countries, movieDetail.release_date, movieDetail.revenue, movieDetail.runtime, movieDetail.spoken_languages, movieDetail.status, movieDetail.tagline, 
      movieDetail.title, movieDetail.video, movieDetail.vote_average, movieDetail.vote_count)
        }),
        catchError(this.handleError)      
    )    
  }

  getMovieCredits(movieID: number): Observable<MovieCredits>{
    let searchParams = new HttpParams();
    // Begin assigning parameters
    searchParams = searchParams.append('api_key', this.apiKey);

    return this.http.get<MovieCredits>(`${this.baseSearchMovieByIDUrl}/${movieID}/credits`, {headers: httpHeaders.headers, params: searchParams}).pipe(
      tap(results => console.log(results)), 
      map( (results:MovieCredits) => {return results}),
      tap(results => console.log(results)),
      catchError(this.handleError)      
    )
  }

  getMoviesBySearch(searchTerm: string): Observable<Movie[]> {

    if(searchTerm === '' || searchTerm === null)
    {
      return of(null);
    }
    let searchParams = new HttpParams();
    // Begin assigning parameters
    searchParams = searchParams.append('api_key', this.apiKey);
    searchParams = searchParams.append('query', searchTerm);       

    return this.http.get<Movie[]>(`${this.baseSearchMovieUrl}`, {headers: httpHeaders.headers, params: searchParams}).pipe(     
      map((results:any) => { return results.results}),
        // return results.results.map(
        //   movie => {
        //     return new Movie(movie.vote_count, movie.id, movie.video, movie.vote_average, movie.title, movie.popularity, movie.poster_path, 
        //       movie.original_language, movie.original_title, movie.genre_ids, movie.backdrop_path, movie.adult, movie.overview, movie.release_date);
        //   }
        // )
        catchError(this.handleError)
      )
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error(`An error occurred: ${error.error.message}`);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an ErrorObservable with a user-facing error message
    return new ErrorObservable(
      'Something bad happened; please try again later.');
  };
}
