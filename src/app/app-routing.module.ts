import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'cerita-home',
    pathMatch: 'full'
  },
  {
    path: 'cerita-home',
    loadChildren: () => import('./cerita-home/cerita-home.module').then( m => m.CeritaHomePageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
