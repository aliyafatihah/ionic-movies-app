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
  searched = false;

  private movieSub: Subscription;

  constructor(private http: HttpClient, private modalCtrl: ModalController, private movieService: MovieService) { }

  ngOnInit() {
    this.movieService.fetchSavedMovies();
    this.movieSub = this.movieService.movies.subscribe(movies => {
      this.loadedMovieList = movies;
    });

    this.movieSub = this.movieService.savedMovies.subscribe(movies => {
      this.savedMovies = movies;
    });

    this.form = new FormGroup({
      searchTerm: new FormControl(null,{
        updateOn: 'blur',
        validators: [Validators.required]
      })
    });
  }

  ionViewWillEnter(){
    this.movieService.fetchSavedMovies();
  }

  searchMovie(){
    this.movieList = [];
    this.http.get<any>('https://www.omdbapi.com/?apikey=2c3f3c8&s=' + this.form.value.searchTerm).subscribe(resData => {
      resData['Search'].forEach(movie => {
        this.movieList.push(
          new Movie(
            movie['imdbID'],
            movie['Title'],
            movie['Year'],
            movie['Poster']
          )
        );
      });
      });
      this.movieService.modifyMovies(this.movieList);
      this.searched = true;
  }

  toggleLikeMovie(id: string){
    if(this.toggleHeart(id)){
      this.movieService.addSavedMovie(id);
      this.savedMovies.push(this.movieService.getMovie(id));
      this.movieService.modifySavedMovies(this.savedMovies);
    }
    else{
      this.savedMovies.forEach((temp,index)=> {
        if(temp.id === id){
          this.savedMovies.splice(index,1);
          this.movieService.deleteSavedMovie(temp.key);
          this.movieService.modifySavedMovies(this.savedMovies);
        }
      });
    }
  }

  toggleHeart(id: string){
    if(!this.savedMovies.some((el)=>  el.id === id)){
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
