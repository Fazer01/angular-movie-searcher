import { Component, OnInit, Input } from '@angular/core';
import { Movie } from '../shared/movie';

@Component({
  selector: 'smx-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {

  @Input()
  public movie: Movie;

  constructor() { }

  ngOnInit() {
  }

}
