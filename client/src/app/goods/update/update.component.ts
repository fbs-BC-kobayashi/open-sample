import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap,} from '@angular/router';
import { HttpService } from '../../service/http-service.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  goods_detail:any;
  goods_form :any;
  constructor(private route: ActivatedRoute,private httpService: HttpService,private router: Router) {
    this.route.paramMap
    .subscribe((params: ParamMap) => {
      this.goods_detail = JSON.parse(params.get('goods_value'));
      //console.log(this.goods_detail)
      this.goods_form = this.goods_detail
      //console.log(JSON.stringify(this.goods_form))
      this.goods_form = new FormGroup({
        name: new FormControl(this.goods_detail.name),
        goods_id: new FormControl(this.goods_detail.goods_id),
        size: new FormControl(this.goods_detail.size),
        amount: new FormControl(this.goods_detail.amount),
        note: new FormControl(this.goods_detail.note),
      });
    });
  }

  message:string[];
  

  public updateGoods(){
    console.log(this.goods_form)
    this.httpService.update(this.goods_form)
      .then(response => {
        //成功時の処理
        this.message = response["message"];
      }, error => {
        //失敗時の処理
        console.log(error);
      });
    }
  ngOnInit() {
  }

}