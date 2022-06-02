import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { MovieService } from 'src/app/services/movie.service';
import { Movie } from '../../cerita/movie.model';

@Component({
  selector: 'app-edit-movie',
  templateUrl: './edit-movie.page.html',
  styleUrls: ['./edit-movie.page.scss'],
})
export class EditMoviePage implements OnInit, OnDestroy {
  ceritaId: string;
  movie: Movie;
  editedMovie: Movie;
  savedMovies: Movie[] = [];
  form: FormGroup;
  private movieSub: Subscription;

  constructor(
    private navCtrl: NavController,
    private route: ActivatedRoute,
    private movieService: MovieService
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
      this.form = new FormGroup({
        title: new FormControl(this.movie.title, {
          updateOn: 'blur',
          validators: [Validators.required],
        }),
        year: new FormControl(this.movie.year, {
          updateOn: 'blur',
          validators: [Validators.required],
        }),
        plot: new FormControl(this.movie.plot, {
          updateOn: 'blur',
          validators: [Validators.required],
        }),
        rating: new FormControl(this.movie.rating, {
          updateOn: 'blur',
          validators: [Validators.required],
        }),
        director: new FormControl(this.movie.director, {
          updateOn: 'blur',
          validators: [Validators.required],
        }),
        actor: new FormControl(this.movie.actors, {
          updateOn: 'blur',
          validators: [Validators.required],
        }),
        description: new FormControl(this.movie.description, {
          updateOn: 'blur',
        }),
      });
    });
  }

  ngOnDestroy(): void {
    this.movieSub.unsubscribe();
  }

  //retrieve form value and update the database
  onSave() {
    this.editedMovie = new Movie(
      this.movie.id,
      this.form.value.title,
      this.form.value.year,
      this.movie.image,
      this.form.value.plot,
      '' + this.form.value.rating,
      this.form.value.actor,
      this.form.value.director,
      this.movie.genre,
      this.movie.language,
      this.form.value.description,
      this.movie.key
    );
    this.movieService.updateSavedMovie(this.editedMovie);
    this.savedMovies.forEach((temp) => {
      if (temp.id === this.ceritaId) {
        temp = new Movie(
          this.editedMovie.id,
          this.editedMovie.title,
          this.editedMovie.year,
          this.editedMovie.image,
          this.editedMovie.plot,
          this.editedMovie.rating,
          this.editedMovie.actors,
          this.editedMovie.director,
          this.editedMovie.genre,
          this.editedMovie.language,
          this.editedMovie.description,
          this.editedMovie.key
        );
      }
    });
    // this.movieService.modifySavedMovies(this.savedMovies);
    this.navCtrl.navigateBack('/cerita-home/tabs/saved');
  }
}
