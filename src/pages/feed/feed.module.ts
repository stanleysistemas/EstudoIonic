import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FeedPage } from './feed';
import { SharedModule } from '../../app/shared.module';



@NgModule({
  declarations: [
    FeedPage
  ],
  imports: [
    IonicPageModule.forChild(FeedPage),
    SharedModule
  ],
  exports:[
    FeedPage,
    
  ]
})
export class FeedPageModule {}
