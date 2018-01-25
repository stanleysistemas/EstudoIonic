import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the BlocosdetalhesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-blocosdetalhes',
  templateUrl: 'blocosdetalhes.html',
})
export class BlocosdetalhesPage {

  public bloco;
  public blocoid;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams
  ) {
  }

  ionViewDidEnter() {
    this.blocoid = this.navParams.get("id");
   
  }

}
