import { Component } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [
  ],
})
export class AppComponent {
  title = 'root';

  navLinks = [
    { path: '/goods/create', label: '登録' },
    { path: '/goods/list', label: '検索' },
    { path: '/login', label: 'ログアウト' },
    { path: '/hero', label: '公式ヒーロー' },
    
  ];
}