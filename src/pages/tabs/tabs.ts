import { Component } from '@angular/core';

import { CatPage } from '../cat/cat';
import { OthersPage } from '../others/others';
import { HomePage } from '../home/home';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = CatPage;
  tab3Root = OthersPage;

  constructor() {

  }
}
