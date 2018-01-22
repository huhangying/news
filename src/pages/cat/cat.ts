import {Component, OnInit} from '@angular/core';
import { NavController } from 'ionic-angular';
import {HttpClient} from "@angular/common/http";
import {ItemPage} from "../item/item";
import { Storage } from '@ionic/storage';
import { ConfigService } from "../../service/config";

@Component({
  selector: 'page-cat',
  templateUrl: 'cat.html'
})

export class CatPage implements OnInit{

  items: any;
  title: string;
  loaded: boolean;
  config: any;
  constructor(public navCtrl: NavController, private http: HttpClient, private storage: Storage,
              config: ConfigService) {
    this.loaded = false;
    this.config = config;
  }

  ngOnInit(): void {
    this.storage.get('cid').then(
      data => {
        if (!data) {
          // set default data
          data = 1;
          this.storage.set('cid', 1);
        }
        this.title = this.config.getCatTitles()[data].title;

        this.http.get(`http://47.90.207.3:3000/news/cat/${data}/100`).subscribe(
          // Successful responses call the first callback.
          data => {
            console.log(JSON.stringify(data));
            this.items = data;
            this.loaded = true;
          },
          // Errors will call this callback instead:
          err => {
            console.log('Something went wrong!');
          });

      },
      err => {
        console.log('err:', err)
      });


  }

  getListByCat(catId) {

  }

  itemSelected(id) {
    this.storage.set('id', id);
    this.navCtrl.push(ItemPage);
  }

}
