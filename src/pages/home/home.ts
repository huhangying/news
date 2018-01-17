import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  title: string;
  constructor(public navCtrl: NavController, private storage: Storage) {
    this.title = 'Tour of Heroes';
    this.storage.set('title', this.title);
  }

}
