import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Platform } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';

declare var google;

@IonicPage()
@Component({
  selector: 'page-search-place',
  templateUrl: 'search-place.html',
})
export class SearchPlace {
	 homeSegment: string = "Map";
	latitude:any;
	longitude:any;
  location:any;
  map:any;
  service:any;
  type:string;
  place_detail:any;
  place:any = [];
  lastMark:any = -1;
  markers:any = [];

  constructor(private geolocation: Geolocation, public plt: Platform, public navCtrl: NavController, public navParams: NavParams) {
  	let options = {
    	enableHighAccuracy: true
  	};

	  this.plt.ready().then((readySource) => {
	  	this.type = this.navParams.get('type');
	  	//console.log("type:",this.type);
	      geolocation.getCurrentPosition(options).then((resp) => {
	        this.latitude = resp.coords.latitude;
	        this.longitude = resp.coords.longitude;
	        console.log(this.latitude);
	        console.log(this.longitude);
	        this.setMap();
	      }).catch((error) => {
	        console.log('Error getting location', error);
	      });

	  });
  }
	updatePage(homeSegment) {
	  if (homeSegment === 'Map') {
	    this.setMap();
	  }
	}
  setMap(){

		this.location = new google.maps.LatLng(this.latitude, this.longitude);

		let mapOptions = {
			center: this.location,
      zoom: 16,
      mapTypeId: google.maps.MapTypeId.ROADMAP
		}
		let map = new google.maps.Map(document.getElementById('map'), mapOptions);
	
		let request = {
	    location: this.location,
	    radius: '2000',
	    types: [this.type]
	  };
	  console.log(request);

	  var self = this;

  	this.service = new google.maps.places.PlacesService(map);
  	this.service.nearbySearch(request, callback);

		function callback(results, status) {
		  if (status == google.maps.places.PlacesServiceStatus.OK) {
		    for (var i = 0; i < results.length; i++) {
		      self.place[i] = results[i];
		      console.log(results[i].name)
		      addMarker(results[i]);

		    }
		    document.getElementById("name").innerHTML = self.place[0].name;
		    document.getElementById("address").innerHTML = self.place[0].vicinity;
		    self.markers[0].setIcon("assets/icon/m2.png");

		  }
		}

		function addMarker(result) {

			let myloc = new google.maps.Marker({
			  map: map,
			  animation: google.maps.Animation.DROP,
			  position: self.location,
			  icon: "assets/icon/me.png"
			});

			let loc = new google.maps.LatLng(result.geometry.location.lat(), result.geometry.location.lng());
	    let marker = new google.maps.Marker({
			  map: map,
			  animation: google.maps.Animation.DROP,
			  position: loc,
			  icon: "assets/icon/m1.png"
			});

	    self.markers.push(marker);
		 	addInfoWindow(marker);
		}

		function addInfoWindow(marker) {
			//document.getElementById("marker").click();
			//google.maps.event.trigger(marker, 'click');
			google.maps.event.addListener(marker, 'click', () => {
		    let markLat = marker.getPosition().lat();
		    let markLng = marker.getPosition().lng();
		    for (var i = 0; i < self.place.length; ++i) {
		    	if(self.place[i].geometry.location.lat()==markLat && self.place[i].geometry.location.lng()==markLng){
		    		console.log(self.place[i]);
		    		document.getElementById("name").innerHTML = self.place[i].name;
		    		document.getElementById("address").innerHTML = self.place[i].vicinity;
		    		if(self.lastMark < 0){
		    			self.lastMark = i;
		    			marker.setIcon("assets/icon/m2.png");
		    		}else {
		    			self.markers[self.lastMark].setIcon("assets/icon/m1.png");
		    			marker.setIcon("assets/icon/m2.png");
		    			self.lastMark = i;
		    		}
   		
						self.itemTap(i);	
		    	}
		    }

		  });
		}

		
	} 
		 itemTap(index) {
		 	console.log(index);
		 		var self = this;
		 		var request = {
					placeId: this.place[index].place_id
				};

				this.service.getDetails(request, callback);
		    function callback(results, status) {
		    		if (status == google.maps.places.PlacesServiceStatus.OK) {
					    self.place_detail = results;
					  }
		    }
			
		} 

}
