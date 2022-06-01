/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable no-underscore-dangle */
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Movie } from '../cerita-home/cerita/movie.model';

interface MovieData {
     id: string;
     title: string;
     year: string;
     image: string;
     plot?: string;
     rating?: string;
     actors?: string;
     director?: string;
     genre?: string;
     language?: string;
     description?: string;
}

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private _movies = new BehaviorSubject<Movie[]>([]);
  private _savedMovies = new BehaviorSubject<Movie[]>([]);
  constructor(private http: HttpClient){}

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

  fetchSavedMovies(){
    const url = 'https://cerita-app-fa00a-default-rtdb.asia-southeast1.firebasedatabase.app/saved-movies.json';
    this.http.get(url, {params: new HttpParams().set('orderBy','"id"')})
    .subscribe(movies =>{
      const savedMovieList = [];
      for(const key in movies){
        if(movies.hasOwnProperty(key)){
          savedMovieList.push(
            new Movie(
              movies[key].id,
              movies[key].title,
              movies[key].year,
              movies[key].image,
              movies[key].plot,
              movies[key].rating,
              movies[key].actors,
              movies[key].director,
              movies[key].genre,
              movies[key].language,
              movies[key].description,
              key
            )
          );
        }
      }
        this.modifySavedMovies(savedMovieList);
      });
  }

  addSavedMovie(
    id: string
  ) {
    let movie: Movie;
    this.http.get<any>('https://www.omdbapi.com/?apikey=2c3f3c8&i=' + id).subscribe(resData => {
        movie = new Movie(
        resData['imdbID'],
        resData['Title'],
        resData['Year'],
        resData['Poster'],
        resData['Plot'],
        resData['imdbRating'],
        resData['Actors'],
        resData['Director'],
        resData['Genre'],
        resData['Language'],
        'N/A'
      );
      this.http
      .post(
        'https://cerita-app-fa00a-default-rtdb.asia-southeast1.firebasedatabase.app/saved-movies.json',
          movie
      ).subscribe(response => {
        console.log(response);
      });
        });
  }

  deleteSavedMovie(key: string){
    this.http.delete(`https://cerita-app-fa00a-default-rtdb.asia-southeast1.firebasedatabase.app/saved-movies/${key}.json`)
    .subscribe();
    console.log('Deleted a saved movie');

  }

  updateSavedMovie(movieObj: Movie){
    this.http.put(`https://cerita-app-fa00a-default-rtdb.asia-southeast1.firebasedatabase.app/saved-movies/${movieObj.key}.json`,{
      ...movieObj
    })
    .subscribe();
    console.log('Saved changes');
  }

  getMovie(id: string){
    const loadedMovie = new Movie(
      undefined,
      undefined,
      undefined,
      undefined,
    );
    this.http.get<any>('https://www.omdbapi.com/?apikey=2c3f3c8&i=' + id).subscribe(resData => {

       loadedMovie.id = resData['imdbID'];
       loadedMovie.title = resData['Title'];
       loadedMovie.year = resData['Year'];
       loadedMovie.image = resData['Poster'];
       loadedMovie.plot = resData['Plot'];
       loadedMovie.rating = resData['imdbRating'];
       loadedMovie.actors = resData['Actors'];
       loadedMovie.director = resData['Director'];
       loadedMovie.genre = resData['Genre'];
       loadedMovie.language = resData['Language'];
       loadedMovie.description = 'N/A';

  });
  return loadedMovie;
  }
}
