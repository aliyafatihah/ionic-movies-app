/* eslint-disable @typescript-eslint/dot-notation */
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { element } from 'protractor';
import { Movie } from './movie.model';

@Component({
  selector: 'app-cerita',
  templateUrl: './cerita.page.html',
  styleUrls: ['./cerita.page.scss'],
})
export class CeritaPage implements OnInit {

  form: FormGroup;
  movieList: Movie[] = [];
  savedMovies: Movie[] = [];
  searched = false;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.form = new FormGroup({
      searchTerm: new FormControl(null,{
        updateOn: 'blur',
        validators: [Validators.required]
      })
    });
  }

  searchMovie(){
    this.movieList = [];
    this.http.get<any>('https://www.omdbapi.com/?apikey=2c3f3c8&s=' + this.form.value.searchTerm).subscribe(resData => {
      resData['Search'].forEach(movie => {
        this.movieList.push(
          new Movie(
            movie['Title'],
            movie['Year'],
            movie['Poster']
          )
        );
      });
      });
      this.searched = true;
  }

  toggleLikeMovie(title: string, year: string, image: string){
    if(this.toggleHeart(title)){
      this.savedMovies.push(
        new Movie (
          title,
          year,
          image
        )
      );
    }
    else{
      this.savedMovies.forEach((temp,index)=> {
        if(temp.title === title){
          this.savedMovies.splice(index,1);
          console.log('removed');
        }
      });
    }
    console.log(this.savedMovies);
  }

  toggleHeart(movie: string){
    if(!this.savedMovies.some((el)=>  el.title === movie)){
      return true;
    }
  }

}
