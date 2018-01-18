import {Component, OnInit} from '@angular/core';
import { NavController } from 'ionic-angular';
import {HttpClient} from "@angular/common/http";
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-item',
  templateUrl: 'item.html'
})

export class ItemPage implements OnInit{

  public item: any;
  contentList: any;
  id: string;
  constructor(public navCtrl: NavController, private http: HttpClient, private storage: Storage) {
    this.item = {};
    this.storage.get('id').then(data => {
      this.id = data;

      console.log('http://47.90.207.3:3000/news/' + this.id)
      this.http.get('http://47.90.207.3:3000/news/' + this.id).subscribe(
        // Successful responses call the first callback.
        data => {
          console.log(JSON.stringify(data));
          this.item = data;

          this.item.contentList = this.buildContent(this.item.content);
        },
        // Errors will call this callback instead:
        err => {
          console.log('Something went wrong!');
        }
      );
    });
  }

  buildContent (content){
    var afterList = [];
    if (content) {
      var list = content.split('|');
      if (list && list.length > 0) {
        list.forEach((c) => {
          if (c.match(/\.(jpeg|jpg|gif|png)$/) != null) {
            afterList.push({type: 'img', content: "http://47.90.207.3:3000/images/popyard/" + c});
          }
          else {
            afterList.push({type: 'p', content: c});
          }
        })
      }
    }
    return afterList;
  }

  ngOnInit(): void {

  }


}
