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
// ルーティングによる画面遷移のために必要なモジュール
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { GoodsComponent } from './goods/goods.component';
import { CreateComponent } from './goods/create/create.component';
import { UpdateComponent } from './goods/update/update.component';
import { DetailsComponent } from './goods/details/details.component';
import { ListComponent } from './goods/list/list.component';

// Routing を行う対象のコンポーネントを管理する
// path にセットした文字列にマッチしたURLが指定されると、対になっているコンポーネントが表示される
// 下記のように明示する以外にも
//    '' で [/] のルートパスを指定できる
//    '**' でワイルドカードを指定できる
const ROUTE_TABLE: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'goods', component: GoodsComponent },
  { path: 'goods/create', component: CreateComponent },
  { path: 'goods/update', component: UpdateComponent },
  { path: 'goods/details', component: DetailsComponent },
  { path: 'goods/list', component: ListComponent },
  
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
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }