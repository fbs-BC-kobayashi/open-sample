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
    var data = this.httpService.list()
    console.log(data)
  }
  displayedColumns: string[] = ['goods_id', 'name', 'size', 'amount', 'note'];

  



  ngOnInit() {
  }

}
