import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CeritaHomePageRoutingModule } from './cerita-home-routing.module';

import { CeritaHomePage } from './cerita-home.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CeritaHomePageRoutingModule
  ],
  declarations: [CeritaHomePage]
})
export class CeritaHomePageModule {}
