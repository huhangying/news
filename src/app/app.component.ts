import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import { ImageLoaderConfig } from 'ionic-image-loader';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = TabsPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, imageLoaderConfig: ImageLoaderConfig) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      // set image lazy load
      imageLoaderConfig.setDisplay('inline-block');
      imageLoaderConfig.enableSpinner(true);
      imageLoaderConfig.setMaximumCacheAge(7 * 24 * 60 * 60 * 1000); // 7 days
      imageLoaderConfig.setFallbackUrl('http://47.90.207.3:3000/images/not-available.jpg'); // if images fail to load, display this image instead
    });
    // test below
    console.log(JSON.stringify(platform.platforms()));
    console.log(platform.url());
  }
}
