import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  {
    path: 'kayit',
    loadChildren: () => import('./kayit/kayit.module').then( m => m.KayitPageModule)
  },
  {
    path: 'anasayfa',
    loadChildren: () => import('./anasayfa/anasayfa.module').then( m => m.AnasayfaPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
