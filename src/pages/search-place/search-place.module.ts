import { NgModule } from '@angular/core';
import { IonicModule,IonicPageModule } from 'ionic-angular';
import { SearchPlace } from './search-place';

@NgModule({
  declarations: [
    SearchPlace,
  ],
  imports: [
    IonicPageModule.forChild(SearchPlace),
  ],
  exports: [
    SearchPlace
  ]
})
export class SearchPlaceModule {}
