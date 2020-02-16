import { Component, OnInit, Input } from '@angular/core';

import { HttpService } from '../service/http-service.service';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  message:string[];
  error: any;
  headers: string[];
  goods = ['Windstorm', 'Bombasto', 'Magneta', 'Tornado'];
  name = new FormControl('');
  
  updateName() {
    console.log(this.name.value)
  }
  addHero(newGoods: string) {
    console.log(newGoods)
    if (newGoods) {
      this.goods.push(newGoods);
    }
  }
  constructor(private httpService: HttpService) { }
  onSubmit() {
    this.httpService.login()
      .then(response => {
        //成功時の処理
        this.message = response;
        console.log(this.message)
      }, error => {
        //失敗時の処理
        console.log(error);
      });
    }
    onPost(goods: string){
      console.log(goods)
      var message = this.httpService.loginpost(goods)
      console.log(message)
    }
    ngOnInit() {
    }

  }