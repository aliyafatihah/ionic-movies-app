import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CeritaDetailsPageRoutingModule } from './cerita-details-routing.module';

import { CeritaDetailsPage } from './cerita-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CeritaDetailsPageRoutingModule
  ],
  declarations: [CeritaDetailsPage]
})
export class CeritaDetailsPageModule {}
