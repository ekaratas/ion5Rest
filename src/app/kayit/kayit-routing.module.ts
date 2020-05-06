import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { KayitPage } from './kayit.page';

const routes: Routes = [
  {
    path: '',
    component: KayitPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class KayitPageRoutingModule {}
