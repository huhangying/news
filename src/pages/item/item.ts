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
  id: string;
  constructor(public navCtrl: NavController, private http: HttpClient, private storage: Storage) {
    this.storage.get('id').then(data => {
      this.id = data;

      console.log('http://47.90.207.3:3000/news/' + this.id)
      this.http.get('http://47.90.207.3:3000/news/' + this.id).subscribe(
        // Successful responses call the first callback.
        data => {
          console.log(JSON.stringify(data));
          this.item = data;
        },
        // Errors will call this callback instead:
        err => {
          console.log('Something went wrong!');
        }
      );
    });
  }

  ngOnInit(): void {

  }


}
