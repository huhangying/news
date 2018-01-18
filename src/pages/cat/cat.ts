import {Component, OnInit} from '@angular/core';
import { NavController } from 'ionic-angular';
import {HttpClient} from "@angular/common/http";
import {ItemPage} from "../item/item";
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-cat',
  templateUrl: 'cat.html'
})

export class CatPage implements OnInit{

  items: any;
  title: string;
  constructor(public navCtrl: NavController, private http: HttpClient, private storage: Storage) {
  }

  ngOnInit(): void {
    this.http.get('http://47.90.207.3:3000/news/cat/1/100').subscribe(
      // Successful responses call the first callback.
      data => {
        console.log(JSON.stringify(data));
        this.items = data;
        this.storage.get('title').then(data => {
          this.title = data;
        });
      },
      // Errors will call this callback instead:
      err => {
        console.log('Something went wrong!');
      }
    );
  }

  getListByCat(catId) {

  }

  itemSelected(id) {
    this.storage.set('id', id);
    this.navCtrl.push(ItemPage);
  }

}
