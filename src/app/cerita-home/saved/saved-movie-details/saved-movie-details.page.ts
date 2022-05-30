/* eslint-disable @typescript-eslint/dot-notation */
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { MovieService } from 'src/app/services/movie.service';
import { Movie } from '../../cerita/movie.model';

@Component({
  selector: 'app-saved-movie-details',
  templateUrl: './saved-movie-details.page.html',
  styleUrls: ['./saved-movie-details.page.scss'],
})
export class SavedMovieDetailsPage implements OnInit {

  ceritaId: string;
  descBool = false;
  movie = new Movie(
    undefined,
    undefined,
    undefined,
    undefined
  );
  savedMovies: Movie[] = [];
  private movieSub: Subscription;

  constructor(private router: Router, private navCtrl: NavController, private route: ActivatedRoute, private movieService: MovieService,
    private http: HttpClient) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      if(!paramMap.has('ceritaId')){
        this.navCtrl.navigateBack('/cerita-home/tabs/cerita');
        return;
      }

      this.ceritaId = paramMap.get('ceritaId');

      this.http.get<any>('https://www.omdbapi.com/?apikey=2c3f3c8&i=' + this.ceritaId).subscribe(resData => {
      this.movie = new Movie(
        resData['imdbID'],
        resData['Title'],
        resData['Year'],
        resData['Poster'],
        resData['Plot'],
        resData['imdbRating'],
        resData['Actors'],
        resData['Director'],
        resData['Genre'],
        resData['Language']
      );
        });
        this.movieSub = this.movieService.savedMovies.subscribe(movies => {
          this.savedMovies = movies;
        });
    });
  }

  dislikeMovie(){
    this.savedMovies.forEach((temp,index)=> {
      if(temp.id === this.movie.id){
        this.savedMovies.splice(index,1);
      }
    });
    this.movieService.modifySavedMovies(this.savedMovies);
    this.navCtrl.navigateBack('/cerita-home/tabs/saved');
  }

}
