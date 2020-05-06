import { Component, OnInit } from '@angular/core';
import { RestService } from '../rest.service';
import { Router } from '@angular/router';
import { Plugins } from '@capacitor/core';

const { Storage } = Plugins;


@Component({
  selector: 'app-kayit',
  templateUrl: './kayit.page.html',
  styleUrls: ['./kayit.page.scss'],
})
export class KayitPage implements OnInit {

  userData = { 'name': '', 'email': '', 'username': '', 'password': ''};

  constructor(public restservice:RestService, public router:Router) { }

  ngOnInit() {
  }

  async kayit() {
    this.restservice.veriGonder("kayit", this.userData).subscribe(sonuc=>{console.log(sonuc); this.setItem(sonuc); this.router.navigateByUrl('/anasayfa');} , err=>{console.log(err);});
  }

  async setItem(value) {
    await Storage.set({
      key: 'kullaniciVerisi',
      value: JSON.stringify(value)
    });
  }

}
