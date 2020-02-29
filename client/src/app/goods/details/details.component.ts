import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, } from '@angular/router';
import { HttpService } from '../../service/http-service.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  goods_detail: any = null;
  
  constructor(private route: ActivatedRoute, private httpService: HttpService, private router: Router) {
    this.route.paramMap
      .subscribe((params: ParamMap) => {
        const routeParam = params.get('id');
        //console.log(routeParam)
        this.httpService.detail(routeParam)
          .then(response => {
            console.log(response)
            this.goods_detail = response
            //console.log("data="+this.dataSource)
          })
        // -> 10

      });
  }



  public update() {
    var goods_form = new FormGroup({
      name: new FormControl(this.goods_detail.name),
      goods_id: new FormControl(this.goods_detail.goods_id),
      size: new FormControl(this.goods_detail.size),
      amount: new FormControl(this.goods_detail.amount),
      note: new FormControl(this.goods_detail.note),
    });
    var goods = JSON.stringify(goods_form.value)
    //console.log(goods)
    this.router.navigate(["/goods/update", { goods_value: goods }]);
  }

  ngOnInit() {

  }
}
