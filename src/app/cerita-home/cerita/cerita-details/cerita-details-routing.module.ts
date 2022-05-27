import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CeritaDetailsPage } from './cerita-details.page';

const routes: Routes = [
  {
    path: '',
    component: CeritaDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CeritaDetailsPageRoutingModule {}
