import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../service/http-service.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  dataSource:any;
  serch_form = new FormGroup({
    value: new FormControl(),
    key: new FormControl(),
  });

  constructor(private httpService: HttpService,private router: Router) {
    //console.log("コンストラクタ実行中")
    this.httpService.list()
    .then(response =>{
      this.dataSource = response
      //console.log("data="+this.dataSource)
    })
  }

  displayedColumns: string[] = ['goods_id', 'name', 'size', 'amount', 'note', 'detail'];
  public detail(goods_id:string){
    //console.log(goods_id)
    this.router.navigate(["/goods/details",{ id: goods_id }]);
  }
  /**
   * serch
   */
  public serchGoods() {
    this.httpService.serch(this.serch_form)
    .then(response =>{
      this.dataSource = response
      //console.log("data="+this.dataSource)
    })
  }
  ngOnInit() {
  }

}
