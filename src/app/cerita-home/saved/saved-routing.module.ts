import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SavedPage } from './saved.page';

const routes: Routes = [
  {
    path: '',
    component: SavedPage
  },
  {
    path: 'saved-movie-details',
    loadChildren: () => import('./saved-movie-details/saved-movie-details.module').then( m => m.SavedMovieDetailsPageModule)
  },
  {
    path: 'edit-movie',
    loadChildren: () => import('./edit-movie/edit-movie.module').then( m => m.EditMoviePageModule)
  },
  {
    path: 'add-description',
    loadChildren: () => import('./add-description/add-description.module').then( m => m.AddDescriptionPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SavedPageRoutingModule {}
