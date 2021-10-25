// app-routing.module.ts

import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'intro', pathMatch: 'full' },
  { path: 'intro', loadChildren: () => import('./intro/intro.module').then(m => m.IntroPageModule) },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'registration',
    loadChildren: () => import('./registration/registration.module').then(m => m.RegistrationPageModule)
  },
  { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  { path: 'add-contact', loadChildren: () => import('./add-contact/add-contact.module').then( m => m.AddContactPageModule)},
  {
    path: 'song/:id',
    loadChildren: () => import('./song/song.module').then( m => m.SongPageModule)
  },
  {
    path: 'contactdetail',
    loadChildren: () => import('./contactdetail/contactdetail.module').then( m => m.ContactdetailPageModule)
  },
  {
    path: 'editcontact',
    loadChildren: () => import('./editcontact/editcontact.module').then( m => m.EditcontactPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})

export class AppRoutingModule { }