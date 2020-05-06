import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoadingController } from '@ionic/angular';

@Injectable({providedIn: 'root'})
export class RestService {
  isLoading = false;


  apiURL="http://localhost/php-slim-rest-master/slimapp/api/";

  constructor(private httpclient: HttpClient, public loadingController: LoadingController) { }


  veriGonder(talep, veri) {
    return this.httpclient.post(this.apiURL+talep, veri);
  }

  veriListele(talep) {
    return this.httpclient.get(this.apiURL+talep);
  }

//////////////////////////
async present() {
  this.isLoading = true;
  return await this.loadingController.create({
    message: 'Please wait ...',
    spinner: 'circles' 
  }).then(a => {
    a.present().then(() => {
      console.log('loading presented');
      if (!this.isLoading) {
        a.dismiss().then(() => console.log(''));
      }
    });
  });

}

async dismiss() {
  this.isLoading = false;
  return await this.loadingController.dismiss(true).then(() => console.log(''));
}
  

  
}