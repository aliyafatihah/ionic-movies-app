/* eslint-disable @typescript-eslint/dot-notation */
import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { MovieService } from 'src/app/services/movie.service';
import { Movie } from '../movie.model';

@Component({
  selector: 'app-cerita-details',
  templateUrl: './cerita-details.page.html',
  styleUrls: ['./cerita-details.page.scss'],
})
export class CeritaDetailsPage implements OnInit, OnDestroy {
  ceritaId: string;
  movie = new Movie(undefined, undefined, undefined, undefined);
  savedMovies: Movie[] = [];
  private movieSub: Subscription;

  constructor(
    private navCtrl: NavController,
    private route: ActivatedRoute,
    private movieService: MovieService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap) => {
      if (!paramMap.has('ceritaId')) {
        this.navCtrl.navigateBack('/cerita-home/tabs/cerita');
        return;
      }

      this.ceritaId = paramMap.get('ceritaId');
      this.movie = this.movieService.getMovie(this.ceritaId);
      this.movieSub = this.movieService.savedMovies.subscribe((movies) => {
        this.savedMovies = movies;
      });
    });
  }

  // toggle like/unlike button for movie (add/remove from database/saved movies)
  toggleLikeMovie() {
    if (this.toggleHeart(this.movie.id)) {
      this.movieService.addSavedMovie(this.movie.id);
      this.savedMovies.push(this.movieService.getMovie(this.movie.id));
      this.movieService.modifySavedMovies(this.savedMovies);
    } else {
      this.savedMovies.forEach((temp, index) => {
        if (temp.id === this.movie.id) {
          this.savedMovies.splice(index, 1);
          this.movieService.deleteSavedMovie(temp.key);
          this.movieService.modifySavedMovies(this.savedMovies);
        }
      });
    }
  }

  //check if movie exists in database
  toggleHeart(id: string) {
    if (!this.savedMovies.some((el) => el.id === id)) {
      return true;
    }
  }

  ngOnDestroy() {
    this.movieSub.unsubscribe();
  }
}
