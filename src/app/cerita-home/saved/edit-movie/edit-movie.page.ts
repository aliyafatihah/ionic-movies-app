import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NavController, ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { MovieService } from 'src/app/services/movie.service';
import { Movie } from '../../cerita/movie.model';

@Component({
  selector: 'app-edit-movie',
  templateUrl: './edit-movie.page.html',
  styleUrls: ['./edit-movie.page.scss'],
})
export class EditMoviePage implements OnInit {

  ceritaId: string;
  descBool = true;
  movie: Movie;
  savedMovies: Movie[] = [];
  form: FormGroup;
  private movieSub: Subscription;

  constructor(private router: Router, private navCtrl: NavController, private route: ActivatedRoute, private movieService: MovieService,
    private http: HttpClient, private modalCtrl: ModalController) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      if(!paramMap.has('ceritaId')){
        this.navCtrl.navigateBack('/cerita-home/tabs/saved');
        return;
      }

      this.ceritaId = paramMap.get('ceritaId');
        this.movieSub = this.movieService.savedMovies.subscribe(movies => {
          this.savedMovies = movies;
        });
        this.savedMovies.forEach((temp)=> {
          if(temp.id === this.ceritaId){
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
            if(temp.description === ''){
              this.descBool = false;
            }
          }
        });
        this.form = new FormGroup({
          title: new FormControl(this.movie.title,{
          updateOn: 'blur',
          validators: [Validators.required]
          }),
          year: new FormControl(this.movie.year,{
            updateOn: 'blur',
            validators: [Validators.required]
            }),
            plot: new FormControl(this.movie.plot,{
              updateOn: 'blur',
              validators: [Validators.required]
              }),
              rating: new FormControl(this.movie.rating,{
                updateOn: 'blur',
                validators: [Validators.required]
                }),
                director: new FormControl(this.movie.director,{
                  updateOn: 'blur',
                  validators: [Validators.required]
                  }),
                  actor: new FormControl(this.movie.actors,{
                    updateOn: 'blur',
                    validators: [Validators.required]
                    }),
                    description: new FormControl(this.movie.description,{
                      updateOn: 'blur'
                      }),
        });
      });
  }

  onSave(){}

}
