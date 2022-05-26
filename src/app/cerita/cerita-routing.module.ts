import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CeritaPage } from './cerita.page';

const routes: Routes = [
  {
    path: '',
    component: CeritaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CeritaPageRoutingModule {}
