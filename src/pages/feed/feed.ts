import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { ApiFoliaProvider } from '../../providers/api-folia/api-folia';
import { BlocosdetalhesPage } from '../blocosdetalhes/blocosdetalhes';


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

  public loader;

  public refresher;
  public isRefreshing: boolean = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private apifoliaProvider: ApiFoliaProvider,
    public loadingCtrl: LoadingController
  ) {
  }

  /* public somaDoisNumero(num1:number, num2:number ): void{
    alert(num1 + num2);
  } */

  AbreCarregando() {
    this.loader = this.loadingCtrl.create({
      content: "Por favor espere...",
     // duration: 3000
    });
    this.loader.present();
  }

  fechaCarregando(){
    this.loader.dismiss();
  }

  doRefresh(refresher) {
    this.refresher = refresher;
    this.isRefreshing = true;

    this.carregarBlocos();

  }

    //setTimeout(() => {
    //  console.log('Async operation has ended');
    //  refresher.complete();
    //}, 2000);
  

  ionViewDidEnter() {
    this.carregarBlocos();
  }

  abrirDetalhes(bloco){
    console.log(bloco);
    this.navCtrl.push(BlocosdetalhesPage, {id: bloco.id});
  }

  carregarBlocos(){
    this.AbreCarregando();
    this.apifoliaProvider.getTodosBlocos().subscribe(
      data => {
        const response = (data as any);
        const object_retorno = JSON.parse(response._body);
        this.lista_blocos = object_retorno;

        console.log(this.lista_blocos);

        this.fechaCarregando();
        if(this.isRefreshing){
          this.refresher.complete();
        }
      }, error => {
        console.log(error);
        this.fechaCarregando();
        if(this.isRefreshing){
          this.refresher.complete();
          this.isRefreshing = false;
        }
      }
    )
  }

}
