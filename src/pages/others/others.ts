import {Component, OnInit} from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-others',
  templateUrl: 'others.html'
})
export class OthersPage implements OnInit{

  fontSize: number;

  constructor(public navCtrl: NavController, private storage: Storage) {
    this.fontSize = 0;
  }

  ngOnInit() {
    this.storage.get('fontSize').then(data => {
      this.fontSize = data;
    });
  }

  saveFontSize() {
    this.storage.set('fontSize', this.fontSize);
  }
}
