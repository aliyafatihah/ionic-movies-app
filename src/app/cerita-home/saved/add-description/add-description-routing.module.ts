import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddDescriptionPage } from './add-description.page';

const routes: Routes = [
  {
    path: '',
    component: AddDescriptionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddDescriptionPageRoutingModule {}
