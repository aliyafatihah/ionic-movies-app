import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CeritaPageRoutingModule } from './cerita-routing.module';

import { CeritaPage } from './cerita.page';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    CeritaPageRoutingModule,
    Ng2SearchPipeModule
  ],
  declarations: [CeritaPage]
})
export class CeritaPageModule {}
