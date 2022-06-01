import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MovieService } from 'src/app/services/movie.service';
import { Movie } from '../cerita/movie.model';

@Component({
  selector: 'app-saved',
  templateUrl: './saved.page.html',
  styleUrls: ['./saved.page.scss'],
})
export class SavedPage implements OnInit {

  movieSub: Subscription;
  loadedMovieList: Movie[];

  constructor(private movieService: MovieService) { }

  ngOnInit() {
    this.movieSub = this.movieService.savedMovies.subscribe(movies => {
      this.loadedMovieList = movies;
    });
    this.movieService.fetchSavedMovies();
  }

  dislikeMovie(id: string){
      this.loadedMovieList.forEach((temp,index)=> {
        if(temp.id === id){
          this.loadedMovieList.splice(index,1);
          this.movieService.deleteSavedMovie(temp.key);
          this.movieService.modifySavedMovies(this.loadedMovieList);
        }
      });

}

}
