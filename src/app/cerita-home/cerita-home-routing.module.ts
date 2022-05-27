import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CeritaHomePage } from './cerita-home.page';

// const routes: Routes = [
//   {
//     path: '',
//     component: CeritaHomePage
//   },
//   {
//     path: 'saved',
//     loadChildren: () => import('./saved/saved.module').then( m => m.SavedPageModule)
//   }
// ];

const routes: Routes = [
  {
    path: 'tabs',
    component: CeritaHomePage,
    children: [
      {
        path: 'cerita',
        children: [
          {
            path: '',
            loadChildren: () => import('./cerita/cerita.module').then( m => m.CeritaPageModule)
          },
          {
            path: ':ceritaId',
            loadChildren: () => import('./cerita/cerita-details/cerita-details.module').then( m => m.CeritaDetailsPageModule)
          }
        ]
      },
      {
        path: 'saved',
        children: [
          {
            path: '',
            loadChildren: () => import('./saved/saved.module').then( m => m.SavedPageModule)
          },
          // {
          //   path: 'new',
          //   loadChildren: () => import('./offers/new-offer/new-offer.module').then(m => m.NewOfferPageModule)
          // },
          // {
          //   path: 'edit/:placeId',
          //   loadChildren: () => import('./offers/edit-offer/edit-offer.module').then(m => m.EditOfferPageModule)
          // },
          // {
          //   path: ':placeId',
          //   loadChildren: () => import('./offers/offer-bookings/offer-bookings.module').then(m => m.OfferBookingsPageModule)
          // }
        ]
      },
      {
        path: '',
        redirectTo: '/cerita-home/tabs/cerita',
        pathMatch: 'full'
      }
    ]


  },

  {
    path: '',
    redirectTo: '/cerita-home/tabs/cerita',
    pathMatch: 'full'
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CeritaHomePageRoutingModule {}
