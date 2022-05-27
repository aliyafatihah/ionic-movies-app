/* eslint-disable @typescript-eslint/dot-notation */
import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { FilterComponent } from '../../filter/filter.component';
import { MovieService } from '../../services/movie.service';

import { Movie } from './movie.model';

@Component({
  selector: 'app-cerita',
  templateUrl: './cerita.page.html',
  styleUrls: ['./cerita.page.scss'],
})
export class CeritaPage implements OnInit, OnDestroy {

  form: FormGroup;
  movieList: Movie[] = [];
  savedMovies: Movie[] = [];
  loadedMovieList: Movie[];
  type = '';
  private movieSub: Subscription;

  constructor(private http: HttpClient, private modalCtrl: ModalController, private movieService: MovieService) { }

  ngOnInit() {
    this.movieSub = this.movieService.movies.subscribe(movies => {
      this.loadedMovieList = movies;
    });

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
      this.movieService.modifyMovies(this.movieList);
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
    this.movieService.modifySavedMovies(this.savedMovies);
  }

  toggleHeart(movie: string){
    if(!this.savedMovies.some((el)=>  el.title === movie)){
      return true;
    }
  }

  openFilterModal(){
    console.log('open modal');
    this.modalCtrl.create({
      component: FilterComponent,
      componentProps:{searchedMovie: this.form.value.searchTerm},
      cssClass: 'transparent-modal'
    })
      .then(modalEL => {
      modalEL.present();
      return modalEL.onDidDismiss();
    });
  }

  ngOnDestroy(){
    this.movieSub.unsubscribe(); //prevent leaks
  }

}
