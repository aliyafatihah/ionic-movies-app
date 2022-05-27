/* eslint-disable no-underscore-dangle */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Movie } from '../cerita/movie.model';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private _movies = new BehaviorSubject<Movie[]>([]);

  constructor(){}

  get movies(){
    return this._movies.asObservable();
  }

  modifyMovies(newMovieList: Movie[]){
  this._movies.next(newMovieList);
  }
}
