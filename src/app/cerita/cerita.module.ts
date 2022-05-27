import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CeritaPageRoutingModule } from './cerita-routing.module';

import { CeritaPage } from './cerita.page';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { FilterComponent } from '../filter/filter.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
    CeritaPageRoutingModule,
    Ng2SearchPipeModule
  ],
  declarations: [CeritaPage, FilterComponent]
})
export class CeritaPageModule {}
