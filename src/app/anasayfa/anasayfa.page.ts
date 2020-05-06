import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Plugins } from '@capacitor/core';
import { RestService } from '../rest.service';
import { ActionSheetController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';



const { Storage } = Plugins;


@Component({
  selector: 'app-anasayfa',
  templateUrl: './anasayfa.page.html',
  styleUrls: ['./anasayfa.page.scss'],
})
export class AnasayfaPage implements OnInit {

  myValue:boolean = true;

  userData = {'user_id': '', 'name': '', 'username': '', 'token': '', 'feed': '','feed_id': ''};


  public items: any;

  constructor(public router:Router, public restServis:RestService, public actionSheetController: ActionSheetController, public alertController:AlertController, public toastController: ToastController) { }

  ngOnInit() {
  //this.getObject();
  this.listele();
  //this.getItem();
  }

  logout(){
  this.removeItem();
  this.router.navigateByUrl('/home');
  }

  //yapılan işlem sonucunda sunucudan dönen mesajı ekranda gösterir
  async presentToast(mesaj) {
    const toast = await this.toastController.create({
      message: mesaj,
      duration: 2000
    });
    toast.present();
  }

  async removeItem() {
    await Storage.remove({ key: 'kullaniciVerisi' });
  }

  async getObject() {
    const ret = await Storage.get({ key: 'kullaniciVerisi' });
    const user = JSON.parse(ret.value);
    if (user != null) {
      this.userData.user_id = user.user_id;
      this.userData.name = user.name;
      this.userData.token = user.token;
      //this.userData.feed = user.feed;
      this.userData.username = user.username;
      return user;
    } else {
      this.router.navigateByUrl('');
    }
  }

  async listele() {
    this.getObject().then(data => {
  if (data) {
    //console.log(data);
    this.restServis.present();
    this.restServis.veriListele('mesajlar/' + data.user_id).subscribe(
      sonuc => {
        this.items = sonuc;
        this.restServis.dismiss();
      }, e => {
        console.log(e.error.error);
        this.restServis.dismiss();
      });
  }
    });
  }

  zamanDonustur(time)
  {
    let a = new Date(time * 1000).toLocaleDateString();
    return a;
  }

  kayitEkleAc(){
    this.myValue = false;
  }

  kayitEkleKapa()
  {
    this.myValue = true;
  }

  async yeniKayit(mesaj) {
    this.getObject().then(data => {
  if (data) {
    data.feed = mesaj;
    //console.log(data);
    this.restServis.present();
    this.restServis.veriGonder('mesaj_ekle', data).subscribe(
      sonuc => {
        //console.log(sonuc.text);
        this.presentToast(sonuc);
        this.userData.feed = '';
        this.myValue = true;
        this.restServis.dismiss();
        this.listele();
      }, e => {
        console.log(e.error.error.text);
        this.restServis.dismiss();
      });
  }
    });
  }

//alertController'dan Düzenle düğmesine basıldığı zaman çalışan function
  async kayitDuzenle(id,yenideger) {
    this.getObject().then(data => {
  if (data) {
    data.feed = yenideger;
    data.id = id;
    //console.log(data);
    this.restServis.present();
    this.restServis.veriGonder('mesaj/guncelle/'+id, data).subscribe(
      sonuc => {
        //console.log(sonuc.text);
        this.presentToast(sonuc);
        this.restServis.dismiss();
        this.listele();
      }, e => {
        console.log(e.error.error.text);
        this.restServis.dismiss();
      });
  }
    });
  }

  async kayitSil(id) {
    this.getObject().then(data => {
  if (data) {
    data.id = id;
    //console.log(data);
    this.restServis.present();
    this.restServis.veriGonder('sil/'+id, data).subscribe(
      sonuc => {
        //console.log(sonuc.text);
        this.presentToast(sonuc);
        this.restServis.dismiss();
        this.listele();
      }, e => {
        console.log(e.error.error.text);
        this.restServis.dismiss();
      });
  }
    });
  }

  //kayıt silinmek istendiğinde kullanıcıya onay amaçlı getirilen alertController
  async presentAlertConfirm(id) {
    const alert = await this.alertController.create({
      header: 'Dikkat!',
      message: 'Bu kaydı silmek istiyor musunuz?',
      buttons: [
        {
          text: 'Vazgeç',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Sil',
          handler: () => {
            this.kayitSil(id);
          }
        }
      ]
    });

    await alert.present();
  }

  //her bir kayda tıklandığında ekranın altında çıkan Düzenle, Sil, Vazgeç seçeneklerinin sunulduğu actionSheetController
  async presentActionSheet(id, feed) {
    const actionSheet = await this.actionSheetController.create({
      header: 'İşlemler ' + '[ ' + id + ' ]',
      buttons: [{
        text: 'Sil',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          this.presentAlertConfirm(id);
        }
      }, {
        text: 'Düzenle',
        icon: 'create',
        handler: () => {
          this.userData.feed = feed;
          this.userData.feed_id = id;
          console.log('Kayıt id : ' + id);
          console.log('Kayıt : ' + feed);
          this.duzenle(id, feed);
          //this.menu(true);
        }
      }, {
        text: 'Vazgeç',
        icon: 'close',
        role: 'cancel',
        handler: () => {
        }
      }]
    });
    await actionSheet.present();
  }


//kayıt düzenlemek için ekranımızda açılan başlığı Kayıt Düzenle olan AlertController
  async duzenle(id, feed) {
    const alert = await this.alertController.create({
      header: 'Kayıt Düzenle',
      inputs: [
        {
          name: 'kayit',
          type: 'text',
          value: feed,
          placeholder: 'kayıt giriniz'
        }
      ],
      buttons: [
        {
          text: 'Vazgeç',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Düzenle',
          handler: (sonuc) => {
            if (sonuc.kayit != feed)
            {
            this.kayitDuzenle(id,sonuc.kayit);
            console.log('Kayıt Düzenlendi !');
          }
          else
          console.log('Bir değişiklik yapılmadı');
          }
        }
      ]
    });

    await alert.present();
  }

}
