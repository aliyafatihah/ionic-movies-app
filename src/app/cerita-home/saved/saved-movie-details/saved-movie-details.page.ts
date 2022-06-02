/* eslint-disable @typescript-eslint/dot-notation */
import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalController, NavController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { MovieService } from 'src/app/services/movie.service';
import { Movie } from '../../cerita/movie.model';
import { AddDescriptionComponent } from '../add-description/add-description.component';

@Component({
  selector: 'app-saved-movie-details',
  templateUrl: './saved-movie-details.page.html',
  styleUrls: ['./saved-movie-details.page.scss'],
})
export class SavedMovieDetailsPage implements OnInit, OnDestroy {
  ceritaId: string;
  descBool = true;
  movie: Movie;
  savedMovies: Movie[] = [];
  private movieSub: Subscription;

  constructor(
    private navCtrl: NavController,
    private route: ActivatedRoute,
    private movieService: MovieService,
    private modalCtrl: ModalController
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap) => {
      if (!paramMap.has('ceritaId')) {
        this.navCtrl.navigateBack('/cerita-home/tabs/saved');
        return;
      }

      this.ceritaId = paramMap.get('ceritaId');
      this.movieSub = this.movieService.savedMovies.subscribe((movies) => {
        this.savedMovies = movies;
      });
      this.savedMovies.forEach((temp) => {
        if (temp.id === this.ceritaId) {
          this.movie = new Movie(
            temp.id,
            temp.title,
            temp.year,
            temp.image,
            temp.plot,
            temp.rating,
            temp.actors,
            temp.director,
            temp.genre,
            temp.language,
            temp.description,
            temp.key
          );
        }
      });
      if (this.movie.description !== 'N/A') {
        this.descBool = false;
      }
    });
  }

  ngOnDestroy(): void {
    this.movieSub.unsubscribe();
  }

  //remove movie from database
  dislikeMovie() {
    this.savedMovies.forEach((temp, index) => {
      if (temp.id === this.movie.id) {
        this.savedMovies.splice(index, 1);
        this.movieService.deleteSavedMovie(temp.key);
        this.movieService.modifySavedMovies(this.savedMovies);
        this.navCtrl.navigateBack('/cerita-home/tabs/saved');
      }
    });
  }

  //open add description modal
  openAddModal() {
    this.modalCtrl
      .create({
        component: AddDescriptionComponent,
        componentProps: { movieObj: this.movie },
        cssClass: '',
      })
      .then((modalEL) => {
        modalEL.present();
        return modalEL.onDidDismiss().then(() => {
          this.movieService.fetchSavedMovies();
          if (
            this.movie.description.length < 0 ||
            this.movie.description === '' ||
            this.movie.description === null
          ) {
            this.descBool = true;
          } else {
            this.descBool = false;
          }
        });
      });
  }
}
