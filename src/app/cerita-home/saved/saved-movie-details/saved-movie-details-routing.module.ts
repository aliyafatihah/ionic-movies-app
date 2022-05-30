import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SavedMovieDetailsPage } from './saved-movie-details.page';

const routes: Routes = [
  {
    path: '',
    component: SavedMovieDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SavedMovieDetailsPageRoutingModule {}
