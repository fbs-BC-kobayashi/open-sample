/*import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';
import * as moment from 'moment';

import { Login } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  public login(login: Login): Promise<string> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    };

    // login APIにPOSTする
    return this.http.post('/api/login', login, httpOptions)
    .toPromise()
    .then((result: any) => {
        // 認証結果がsuccessならトークンを返す
        if (result.result === 'success') {

          // 取得したトークンをLocalStorageに保存する
          const expiresAt = moment().add(result.token, 'second');
          localStorage.setItem('id_token', result.token);
          localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));

          return result.result;
        }
        // 認証結果がsuccessでなければエラーメッセージを返す
        else {
          return Promise.reject(result.message);
        }
      }
    )
    .catch((err: any) => {
        return Promise.reject(err.statusText);
      }
    );
  }
}*/