import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ApiFoliaProvider } from '../../providers/api-folia/api-folia';

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
  providers: [
    ApiFoliaProvider
  ]
})
export class BlocosdetalhesPage {

  public bloco;
  public blocoid;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public apifoliaprovider: ApiFoliaProvider
  ) {
  }

  ionViewDidEnter() {
    this.blocoid = this.navParams.get("id");
    //console.log("bloco Id recebido: ", this.blocoid);
    this.apifoliaprovider.getBlocosDetalhes(this.blocoid).subscribe(data =>{
       let retorno = (data as any)._body;
       this.bloco = JSON.parse(retorno)
    }, error =>{
       console.log(error);
    })
  }
  

}
