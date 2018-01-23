import {Component, OnInit} from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import {HttpClient} from "@angular/common/http";
import {ItemPage} from "../item/item";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {

  loaded: boolean;
  items: any;

  constructor(public navCtrl: NavController, private http: HttpClient, private storage: Storage) {
    this.loaded = false;
    this.items = [];
  }

  ngOnInit(): void {

    this.http.get(`http://47.90.207.3:3000/news/latest/100`).subscribe(
      // Successful responses call the first callback.
      data => {
        //console.log(JSON.stringify(data));
        this.items = data;
        this.items.map(item => {
          item.date = new Date(item.date).toLocaleDateString()
          return item;
        })
        this.loaded = true;
      },
      // Errors will call this callback instead:
      err => {
        console.log('Something went wrong!');
      });
  }

  itemSelected(id) {
    this.storage.set('id', id);
    this.navCtrl.push(ItemPage);
  }
}
