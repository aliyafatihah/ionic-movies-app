import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SavedMovieDetailsPageRoutingModule } from './saved-movie-details-routing.module';

import { SavedMovieDetailsPage } from './saved-movie-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SavedMovieDetailsPageRoutingModule
  ],
  declarations: [SavedMovieDetailsPage]
})
export class SavedMovieDetailsPageModule {}
