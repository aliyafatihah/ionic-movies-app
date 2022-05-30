import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddDescriptionPageRoutingModule } from './add-description-routing.module';

import { AddDescriptionPage } from './add-description.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddDescriptionPageRoutingModule
  ],
  declarations: [AddDescriptionPage]
})
export class AddDescriptionPageModule {}
