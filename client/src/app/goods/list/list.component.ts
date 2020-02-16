import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../service/http-service.service';
import { goods }  from '../../models/models';



@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  goods_list=new goods()
  dataSource:any;
  constructor(private httpService: HttpService) {
    console.log("コンストラクタ実行中")
    this.httpService.list()
      .then(response => {
        //成功時の処理
        this.dataSource = response;
        console.log(response)
      }, error => {
        //失敗時の処理
        console.log(error);
      });
  }
  displayedColumns: string[] = ['goods_id', 'name', 'size', 'amount', 'note'];

  



  ngOnInit() {
  }

}
