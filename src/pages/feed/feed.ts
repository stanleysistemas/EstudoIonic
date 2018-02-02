import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController, Searchbar } from 'ionic-angular';
import { ApiFoliaProvider } from '../../providers/api-folia/api-folia';
import { BlocosdetalhesPage } from '../blocosdetalhes/blocosdetalhes';
import { Network } from "@ionic-native/network";
import { Subscription } from 'rxjs/Subscription';


//declare var navigator: any;
//declare var Connection: any;

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

  @ViewChild('searchbar', { read: ElementRef }) searchbarRef: ElementRef;
  @ViewChild('searchbar') searchbarElement: Searchbar;
  search: boolean = false;
  queryText: string;
  blocos: any;


  /* public objeto_feed = {
    titulo: "Stanley Alves",
    data: "November 5, 1955",
    descricao: "Estou criando um app incrível...",
    qntd_likes: 12,
    qntd_commnets: 4,
    time_comment: "12 ago"
  } */


  public lista_blocos = new Array<any>();
  //public page = 1;

  public loader;

  public refresher;
  public isRefreshing: boolean = false;
  connected: Subscription;
  disconnected: Subscription;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private apifoliaProvider: ApiFoliaProvider,
    public loadingCtrl: LoadingController,
    //private platform: Platform,
    private toast: ToastController,
    private network: Network
  ) {

    this.network.onDisconnect().subscribe(() => {
      this.toast.create({
        message: 'Acho que você não está conectado à internet. Verifique sua conexão e tente novamente.',
        showCloseButton: true,
        closeButtonText: 'Ok'
      }).present();
    })

    this.initializeItems();

    // var date = new Date();
    //var tzoffset = date.getTimezoneOffset() * 60000; //offset in milliseconds
    //var localISOTime = (new Date(Date.now() - tzoffset)).toISOString().slice(0, -1);
    // => '2015-01-26T06:40:36.181'
    //localISOTime;
  }

  initializeItems() {
    this.blocos = this.lista_blocos;
    
  }
  searchAction(ev: any) {
      // Reset items back to all of the items
      this.initializeItems();
  
      // set val to the value of the searchbar
      let val = ev.target.value;
  
      // if the value is an empty string don't filter the items
      if (val && val.trim() != '') {
        this.blocos = this.blocos.filter((item) => {
          return (item.nomeEvento.toLowerCase().indexOf(val.toLowerCase()) > -1);
        })
      }
    }

  /* public somaDoisNumero(num1:number, num2:number ): void{
    alert(num1 + num2);
  } */


  /* checkNetwork() {
    this.platform.ready().then(() => {
      var networkState = navigator.connection.type;
      var states = {};
      states[Connection.UNKNOWN] = 'Unknown connection';
      states[Connection.ETHERNET] = 'Ethernet connection';
      states[Connection.WIFI] = 'WiFi connection';
      states[Connection.CELL_2G] = 'Cell 2G connection';
      states[Connection.CELL_3G] = 'Cell 3G connection';
      states[Connection.CELL_4G] = 'Cell 4G connection';
      states[Connection.CELL] = 'Cell generic connection';
      states[Connection.NONE] = 'No network connection';

      let alert = this.alertCtrl.create({
        title : "Status Conexão",
        subTitle: states[networkState],
        buttons:["OK"]
      
      });
      alert.present();

    }); 

   
  }*/

  toggleSearch() {
    if (this.search) {
      this.search = false;
    } else {
      this.search = true;
      this.searchbarElement.setFocus();
    }
  }

  AbreCarregando() {
    this.loader = this.loadingCtrl.create({
      content: "Por favor aguarde...",
      // duration: 3000
    });
    this.loader.present();
  }

  fechaCarregando() {
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

  /* checkNetwork() {
    this.network.onConnect().subscribe(data => {
      console.log(data)
      this.displayNetworkUpdate(data.type);
    }, error => console.error(error));
   
    this.network.onDisconnect().subscribe(data => {
      console.log(data)
      this.displayNetworkUpdate(data.type);
    }, error => console.error(error));
  } */

  ionViewDidLoad() {

    this.carregarBlocos();
  }

  ionViewDidEnter() {
    // this.checkNetwork();
  }



  // displayNetworkUpdate(connectionState: string){
  //  let networkType = this.network.type;
  //  this.toast.create({
  //    message: `Agora você está ${connectionState} via ${networkType}`,
  //    duration: 3000
  //  }).present();
  // }

  //ionViewWillLeave(){
  //  this.connected.unsubscribe();
  //  this.disconnected.unsubscribe();
  //}



  abrirDetalhes(bloco) {
    // console.log(bloco);
    this.navCtrl.push(BlocosdetalhesPage, { id: bloco.id });
  }

 /*  searchAction(texto: any) {
    this.initializeItems();
    let val = texto.target.value;
    //implement search
    if (val.trim() == '') {
      return;
    }
    this.blocos = this.blocos.filter((item) => {
      return (item.nomeEvento.toLowerCase().indexOf(val.toLowerCase() > -1));
    })
  } */

  carregarBlocos() {
    this.AbreCarregando();
    this.apifoliaProvider.getTodosBlocos().subscribe(
      data => {
        const response = (data as any);
        const object_retorno = JSON.parse(response._body);
        this.lista_blocos = object_retorno;
        this.blocos = this.lista_blocos;
        //  console.log(this.lista_blocos);

        this.fechaCarregando();
        if (this.isRefreshing) {
          this.refresher.complete();
        }
      }, error => {
        console.log(error);
        this.fechaCarregando();
        if (this.isRefreshing) {
          this.refresher.complete();
          this.isRefreshing = false;
        }
      }
    )
  }


}
