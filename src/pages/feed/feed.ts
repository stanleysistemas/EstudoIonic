import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ApiFoliaProvider } from '../../providers/api-folia/api-folia';


/**
 * Generated class for the FeedPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-feed',
  templateUrl: 'feed.html',
  providers: [
    ApiFoliaProvider
  ]
})
export class FeedPage {
  public objeto_feed = {
      titulo:"Stanley Alves",
      data  :"November 5, 1955",
      descricao:"Estou criando um app incrível...",
      qntd_likes:12,
      qntd_commnets:4,
      time_comment:"12 ago"
  }

  public lista_blocos = new Array<any>();

  
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private apifoliaProvider: ApiFoliaProvider
  ) {
  }

  /* public somaDoisNumero(num1:number, num2:number ): void{
    alert(num1 + num2);
  } */

  ionViewDidLoad() {
    this.apifoliaProvider.getTodosBlocos().subscribe(
      data => {
        const response = (data as any);
        const object_retorno = JSON.parse(response._body);
        this.lista_blocos = object_retorno;
        console.log(this.lista_blocos);
      }, error => {
        console.log(error);
      }
    )
  }

}
