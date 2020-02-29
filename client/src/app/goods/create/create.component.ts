import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { HttpService } from '../../service/http-service.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  constructor(private httpService: HttpService) { }

  message: any;
  goods_form = new FormGroup({
    name: new FormControl('牛乳'),
    goods_id: new FormControl('A001'),
    size: new FormControl(255),
    amount: new FormControl(100),
    note: new FormControl('特になし'),
  });

  public createGoods() {
    //console.log(this.goods_form)
    this.httpService.create(this.goods_form)
      .then(response => {
        //成功時の処理
        this.message = response["message"];
        console.log(this.message)
      }, error => {
        //失敗時の処理
        console.log(error);
      });
  }

  ngOnInit() {
  }

}
