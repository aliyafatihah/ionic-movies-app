import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'cerita',
    pathMatch: 'full'
  },
  {
    path: 'cerita',
    loadChildren: () => import('./cerita/cerita.module').then( m => m.CeritaPageModule)
  },
  {
    path: 'cerita/:id',
    loadChildren: () => import('./cerita-details/cerita-details.module').then( m => m.CeritaDetailsPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
