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
  cid: number;
  catList: any;

  constructor(public navCtrl: NavController, private http: HttpClient, private storage: Storage,
              config: ConfigService) {
    this.loaded = false;
    this.config = config;
    //this.cid = 1;
  }

  ngOnInit(): void {
    this.catList = this.config.getCatTitles().filter(cat => {
      return cat.id !== 0
    } );
    console.log(JSON.stringify(this.catList));

    this.storage.get('cid').then(
      data => {
        if (!data) {
          // set default data
          this.cid = 1;
          this.storage.set('cid', this.cid);
        }
        else {
          this.cid = data;
        }
        this.title = this.config.getCatTitles()[this.cid].title;

        this.getItemsByCat(data);
      },
      err => {
        console.log('err:', err)
      });

  }

  // get latest 100.
  getItemsByCat(cid) {
    cid = cid || 1;
    this.loaded = false;
    this.http.get(`http://47.90.207.3:3000/news/cat/${cid}/100`).subscribe(
      // Successful responses call the first callback.
      data => {
        //console.log(JSON.stringify(data));
        this.items = data;
        this.items = this.items.map(item => {
          item.date = new Date(item.date).toLocaleDateString();
          return item;
        })
        this.loaded = true;
      },
      // Errors will call this callback instead:
      err => {
        console.log('Something went wrong!');
      });
  }

  catChanged(cid) {
    this.cid = cid;
    console.log(`you are in cat ${cid}`);
    this.getItemsByCat(cid);
    this.storage.set('cid', cid);

  }

  catSwipe(event) {
    //console.log(event.direction);
    if(event.direction === 4) { // <-
      if (this.cid > 1) {
        this.cid--;
        //this.catChanged(this.cid);
      }
    }
    else if(event.direction === 2) { // ->
      if (this.cid < 12) {
        this.cid++;
        //this.catChanged(this.cid);
      }
    }
  }


  itemSelected(id) {
    this.storage.set('id', id);
    this.navCtrl.push(ItemPage);
  }

}
