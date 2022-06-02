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
  results = false;
  numTimesLeft = 10;
  pageNum = 1;
  filtered = false;


  private movieSub: Subscription;
  private movieSub2: Subscription;

  constructor(private http: HttpClient, private modalCtrl: ModalController, private movieService: MovieService) { }

  ngOnInit() {
    this.movieService.fetchSavedMovies();
    this.movieSub = this.movieService.movies.subscribe(movies => {
      this.loadedMovieList = movies;
    });

    this.movieSub2 = this.movieService.savedMovies.subscribe(movies => {
      this.savedMovies = movies;
    });

    this.form = new FormGroup({
      searchTerm: new FormControl(null,{
        updateOn: 'blur',
        validators: [Validators.required]
      })
    });
  }

  //fetch results from database
  ionViewWillEnter(){
    this.movieService.fetchSavedMovies();
  }

  //search function to retrieve a list of movies from omdb api with s (search) parameter
  searchMovie(){
    this.filtered = false;
    this.movieService.searchMovieByPage(this.form.value.searchTerm,'1');
    this.searched = true;
  }

  //toggle the like\unlike button
  //if like then it is added into the database
  //if unlike then it is deleted from the database
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

  //check if movie exists in database
  toggleHeart(id: string){
    if(!this.savedMovies.some((el)=>  el.id === id)){
      return true;
    }
  }

  //open filter component modal and pass the searched term to select year & category
  openFilterModal(){
    this.modalCtrl.create({
      component: FilterComponent,
      componentProps:{searchedMovie: this.form.value.searchTerm},
      cssClass: 'transparent-modal'
    })
      .then(modalEL => {
      modalEL.present();
      return modalEL.onDidDismiss();
    })
    .then(resultData => {
      console.log(resultData.role);
      if(resultData.role === 'true'){
        this.filtered = true;
      }else{
        this.filtered = false;
      }
    });
  }

  ngOnDestroy(){
    this.movieSub.unsubscribe();
    this.movieSub2.unsubscribe();
  }

  loadData(event) {
    if(this.filtered === true){
      this.numTimesLeft = 0;
    }else{
      console.log('load');
      setTimeout(() => {
        console.log('Done');
        this.pageNum += 1;
        this.movieService.searchMovieByPage(this.form.value.searchTerm,'' + this.pageNum);
        this.numTimesLeft -= 1;
        event.target.complete();
      }, 500);
    }
  }

}
