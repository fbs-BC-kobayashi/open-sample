import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';
import * as moment from 'moment';

import { Login } from '../models/login';

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

  logout() {
    // LocalStorageに保存したトークンを削除する
    localStorage.remoteItem('id_token');
    localStorage.removeItem('expires_at');
  }

  isLogin(): Boolean {
    return moment().isBefore(this.getExpiration());
  }

  getAuthHeader(): string {
    const token = localStorage.getItem('id_token');

    if (token) {
      return 'Bearer ' + token;
    }
    else {
      undefined;
    }
  }

  private getExpiration(): moment.Moment {
    const expiration = localStorage.getItem('expires_at');
    const expiresAt = JSON.parse(expiration);

    return moment(expiresAt);
  }
}