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
  loaded: boolean;
  siblingNum: number;

  constructor(public navCtrl: NavController, private http: HttpClient, private storage: Storage) {
    this.item = {};
    this.loaded = false;
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
    this.storage.get('id').then(data => {
      this.id = data;
      this.loadPage(this.id);
    });
  }

  //private function
  loadSiblingContent(num) {
    this.siblingNum = num;
    // get content by siblingNum
    let found = this.item.siblings.filter(sib => sib.siblingNum === this.siblingNum);
    if (found && found[0]) {
      this.item.contentList = this.buildContent(found[0].content);
    }
  }

  loadPage(id: string) {
    //console.log('http://47.90.207.3:3000/news/' + id)
    this.http.get('http://47.90.207.3:3000/news/' + id).subscribe(
      // Successful responses call the first callback.
      data => {
        //console.log(JSON.stringify(data));
        this.item = data;

        this.item.contentList = this.buildContent(this.item.content);
        this.item.date = new Date(this.item.date).toLocaleDateString();
        this.loaded = true;
        if (this.item.siblingNum > 0) {

          this.http.get('http://47.90.207.3:3000/news/sibs/' + this.item.siblingId).subscribe(
            data => {
              this.siblingNum = this.item.siblingNum;
              this.item.siblings = data;
            },
            err => {
              console.log('Something went wrong!');
            });
        }
      },
      // Errors will call this callback instead:
      err => {
        console.log('Something went wrong!');
      }
    );
  }

  pageSwipe(event) {
    if (!this.item || !this.item.siblings) return;

    //console.log(event.direction);
    if(event.direction === 4) { // <-
      if (this.siblingNum > 1) {
        this.siblingNum--;
        //load sibling content by siblingNum

        this.loadSiblingContent(this.siblingNum);
      }
    }
    else if(event.direction === 2) { // ->
      if (this.siblingNum < this.item.siblings.length) {
        this.siblingNum++;
        this.loadSiblingContent(this.siblingNum);
      }
    }
  }

}
