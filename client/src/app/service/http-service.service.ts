import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  public login(): Promise<string> {
    // login APIにPOSTする
    return this.http.get('/login')
    .toPromise()
    .then((result: any) => {
        // 認証結果がsuccessならトークンを返す
        if (result.result === 'success') {
          console.log("sccess!")
          // 取得したトークンをLocalStorageに保存する
          return "OK!";
        }
        // 認証結果がsuccessでなければエラーメッセージを返す
        else {
          console.log("error!")
        }
      }
    )
  }
  public loginpost(): Promise<string> {
    // login APIにPOSTする
    var message = "POSTだよ＾＾";
    return this.http.post('/login',message)
    .toPromise()
    .then((result: any) => {
        // 認証結果がsuccessならトークンを返す
        if (result.result === 'success') {
          console.log("sccess!")
          // 取得したトークンをLocalStorageに保存する
          return "OK!";
        }
        // 認証結果がsuccessでなければエラーメッセージを返す
        else {
          console.log("error!")
        }
      }
    )
  }
}