/* eslint-disable no-underscore-dangle */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Movie } from '../cerita-home/cerita/movie.model';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private _movies = new BehaviorSubject<Movie[]>([]);
  private _savedMovies = new BehaviorSubject<Movie[]>([]);

  constructor(){}

  get movies(){
    return this._movies.asObservable();
  }

  get savedMovies(){
    return this._savedMovies.asObservable();
  }

  modifyMovies(newMovieList: Movie[]){
  this._movies.next(newMovieList);
  }

  modifySavedMovies(newMovieList: Movie[]){
    this._savedMovies.next(newMovieList);
    }
}
