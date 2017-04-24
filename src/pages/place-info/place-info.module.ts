import { NgModule } from '@angular/core';
import { IonicModule,IonicPageModule } from 'ionic-angular';
import { PlaceInfo } from './place-info';

@NgModule({
  declarations: [
    PlaceInfo,
  ],
  imports: [
    IonicPageModule.forChild(PlaceInfo),
  ],
  exports: [
    PlaceInfo
  ]
})
export class PlaceInfoModule {}
