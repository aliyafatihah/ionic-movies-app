import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Movie } from '../../cerita/movie.model';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-add-description',
  templateUrl: './add-description.component.html',
  styleUrls: ['./add-description.component.scss'],
})
export class AddDescriptionComponent implements OnInit {
  @Input() movieObj: Movie;
  form: FormGroup;

  constructor(
    private modalCtrl: ModalController,
    private http: HttpClient,
    private movieService: MovieService
  ) {}

  ngOnInit() {
    this.form = new FormGroup({
      description: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required],
      }),
    });
  }

  onCancel() {
    this.modalCtrl.dismiss(null, 'cancel');
  }

  //update description value in the database
  onSave() {
    this.movieObj.description = this.form.value.description;
    this.http
      .put(
        `https://cerita-app-fa00a-default-rtdb.asia-southeast1.firebasedatabase.app/saved-movies/${this.movieObj.key}.json`,
        {
          ...this.movieObj,
        }
      )
      .subscribe();
    this.modalCtrl.dismiss();
  }
}
