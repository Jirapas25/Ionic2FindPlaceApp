import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SearchPlace } from '../search-place/search-place';
import { Platform } from 'ionic-angular';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public plt: Platform, public navCtrl: NavController) {
  	this.plt.ready().then((readySource) => {
  		console.log("ready");
  		
	  });
  }

  findNear(arg) {
  	console.log(arg);
		this.navCtrl.push(SearchPlace,{
			type: arg
		});
  }

}
