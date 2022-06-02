/* eslint-disable @typescript-eslint/dot-notation */
import { HttpClient } from '@angular/common/http';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController, NavController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { MovieService } from 'src/app/services/movie.service';
import { Movie } from '../cerita-home/cerita/movie.model';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit,OnDestroy {
  @Input() searchedMovie: string;
  form: FormGroup;

  customAlertOptions: any = {
    translucent: true,
  };
  loadedMovieList: Movie[] = [];
  yearList = ['All'];
  categories = ['All', 'Episode', 'Movie', 'Series'];
  private movieSub: Subscription;

  constructor(
    private modalCtrl: ModalController,
    private movieService: MovieService,
    private http: HttpClient
  ) {}

  ngOnInit() {
    for (let i = 2022; i > 1899; i--) {
      this.yearList.push('' + i);
    }
    this.form = new FormGroup({
      year: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required],
      }),
      category: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required],
      }),
    });
  }

  ngOnDestroy(): void {
    this.movieSub.unsubscribe();
    }

  onCancel() {
    this.modalCtrl.dismiss(null, 'cancel');
  }

  //check value of year and category from user input and call the api accordingly and update the movie list
  filter() {
    if (this.form.value.year !== 'All' && this.form.value.category !== 'All') {
      this.http
        .get<any>(
          'https://www.omdbapi.com/?apikey=2c3f3c8&s=' +
            this.searchedMovie +
            '&y=' +
            this.form.value.year +
            '&type=' +
            this.form.value.category
        )
        .subscribe((resData) => {
          resData['Search'].forEach((movie) => {
            this.loadedMovieList.push(
              new Movie(
                movie['imdbID'],
                movie['Title'],
                movie['Year'],
                movie['Poster']
              )
            );
          });
          this.movieService.modifyMovies(this.loadedMovieList);
        });
    }
    if (this.form.value.year === 'All' && this.form.value.category === 'All') {
      this.http
        .get<any>(
          'https://www.omdbapi.com/?apikey=2c3f3c8&s=' + this.searchedMovie
        )
        .subscribe((resData) => {
          resData['Search'].forEach((movie) => {
            this.loadedMovieList.push(
              new Movie(
                movie['imdbID'],
                movie['Title'],
                movie['Year'],
                movie['Poster']
              )
            );
          });
          this.movieService.modifyMovies(this.loadedMovieList);
        });
    }
    if (this.form.value.year !== 'All' && this.form.value.category === 'All') {
      this.http
        .get<any>(
          'https://www.omdbapi.com/?apikey=2c3f3c8&s=' +
            this.searchedMovie +
            '&y=' +
            this.form.value.year
        )
        .subscribe((resData) => {
          resData['Search'].forEach((movie) => {
            this.loadedMovieList.push(
              new Movie(
                movie['imdbID'],
                movie['Title'],
                movie['Year'],
                movie['Poster']
              )
            );
          });
          this.movieService.modifyMovies(this.loadedMovieList);
        });
    }
    if (this.form.value.year === 'All' && this.form.value.category !== 'All') {
      this.http
        .get<any>(
          'https://www.omdbapi.com/?apikey=2c3f3c8&s=' +
            this.searchedMovie +
            '&type=' +
            this.form.value.category
        )
        .subscribe((resData) => {
          resData['Search'].forEach((movie) => {
            this.loadedMovieList.push(
              new Movie(
                movie['imdbID'],
                movie['Title'],
                movie['Year'],
                movie['Poster']
              )
            );
          });
          this.movieService.modifyMovies(this.loadedMovieList);
        });
    }
    this.modalCtrl.dismiss();
  }
}
