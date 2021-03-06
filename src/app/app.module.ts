import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { FeedPageModule } from '../pages/feed/feed.module';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpModule } from '@angular/http';
import { IntroPageModule } from '../pages/intro/intro.module';
//import { ConfiguracoesPageModule } from '../pages/configuracoes/configuracoes.module';
//import { PerfilPageModule } from '../pages/perfil/perfil.module';
//import { SobrePageModule } from '../pages/sobre/sobre.module';
import { BlocosdetalhesPageModule } from '../pages/blocosdetalhes/blocosdetalhes.module';
import { Network } from "@ionic-native/network";
import { FeedPage } from '../pages/feed/feed';



//import { ApiFoliaProvider } from '../providers/api-folia/api-folia';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    FeedPage,
    TabsPage,
   
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
   // FeedPageModule,
    IntroPageModule,
    HttpModule,
    //ConfiguracoesPageModule,
   // SobrePageModule,
   // PerfilPageModule,
    BlocosdetalhesPageModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    FeedPage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Network,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
    //ApiFoliaProvider
  ]
})
export class AppModule {}
