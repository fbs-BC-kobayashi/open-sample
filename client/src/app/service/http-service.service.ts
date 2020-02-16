import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormGroup, FormControl } from '@angular/forms';

export interface goods {
  name: string
  goods_id: string
  size: number
  amount: number
  note: string
}


@Injectable({
  providedIn: 'root'
})
export class HttpService {
  configUrl = 'assets/config.json';

  constructor(private http: HttpClient) { }

  public create(bodydata: any): Promise<any[]> {
    console.log(bodydata.value)
    // create APIにPOSTする
    return this.http.post("/goods", bodydata.value)
      .toPromise()
      .then((res) => {
        // response の型は any ではなく class で型を定義した方が良いが ここでは簡便さから any としておく
        const response: any = res;
        return response;
      })
      .catch(this.errorHandler);
  }

  public list(): Promise<any[]> {
    console.log("list test!")
    // create APIにPOSTする
    return this.http.get("/goods/list")
      .toPromise()
      .then((res) => {
        // response の型は any ではなく class で型を定義した方が良いが ここでは簡便さから any としておく
        console.log(res)
        const response: any = res;
        return response;
      })
      .catch(this.errorHandler);
  }

  public detail(bodydata: any): Promise<any[]> {
    console.log(":id no test!")
    // create APIにPOSTする
    return this.http.get("/goods/A001")
      .toPromise()
      .then((res) => {
        // response の型は any ではなく class で型を定義した方が良いが ここでは簡便さから any としておく
        const response: any = res;
        return response;
      })
      .catch(this.errorHandler);
  }




  public login(): Promise<any[]> {
    // login APIにPOSTする
    return this.http.get("/login")
      .toPromise()
      .then((res) => {
        // response の型は any ではなく class で型を定義した方が良いが ここでは簡便さから any としておく
        const response: any = res;
        return response;
      })
      .catch(this.errorHandler);
  }


  public loginpost(bodydata: string): Promise<string> {
    console.log(bodydata)
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    // login APIにPOSTする

    return this.http.post('/login', bodydata, httpOptions)
      .toPromise()
      .then((result: any) => {
        console.log("POSTから帰ったよ")
        // 認証結果がsuccessならトークンを返す
        if (result.result === 'success') {
          console.log("sccess!")
          return "OK!";
        }
        // 認証結果がsuccessでなければエラーメッセージを返す
        else {
          console.log("error!")
        }
      }
      )
  }
  private errorHandler(err) {
    console.log('Error occured.', err);
    return Promise.reject(err.message || err);
  }
}