import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { KayitPageRoutingModule } from './kayit-routing.module';

import { KayitPage } from './kayit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    KayitPageRoutingModule
  ],
  declarations: [KayitPage]
})
export class KayitPageModule {}
