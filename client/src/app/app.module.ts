import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
//画面レイアウト
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatInputModule } from '@angular/material/input';
import { MatSliderModule } from '@angular/material/slider';
import { MatButtonModule } from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatDividerModule} from '@angular/material/divider';
import {MatTabsModule} from '@angular/material/tabs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
// ルーティングによる画面遷移のために必要なモジュール
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { GoodsComponent } from './goods/goods.component';
import { CreateComponent } from './goods/create/create.component';
import { UpdateComponent } from './goods/update/update.component';
import { DetailsComponent } from './goods/details/details.component';
import { ListComponent } from './goods/list/list.component';
//import { HeroesComponent } from './heroes/heroes.component';

//通信用？
import { HttpClientModule } from '@angular/common/http';
// バックエンドとの通信を実際に担当するサービス
//import { HttpClientService } from './services/http-client.service';
//import { HttpClientComponent } from './http-client/http-client.component';

import { FormsModule }   from '@angular/forms';

const ROUTE_TABLE: Routes = [
  { path: '', component: AppComponent },
  { path: 'login', component: LoginComponent },
  { path: 'goods', component: GoodsComponent },
  { path: 'goods/create', component: CreateComponent },
  { path: 'goods/update', component: UpdateComponent },
  { path: 'goods/details', component: DetailsComponent },
  { path: 'goods/list', component: ListComponent },
  //{ path: 'hero', component: HeroesComponent },

];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    GoodsComponent,
    CreateComponent,
    UpdateComponent,
    DetailsComponent,
    ListComponent,
  //  HeroesComponent,
//    HttpClientComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(ROUTE_TABLE), // 追加. routing の情報を登録する
    FlexLayoutModule,
    MatInputModule,
    MatSliderModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatDatepickerModule,
    MatDividerModule,
    MatTabsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
  ],
  providers: [
//    HttpClientService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }