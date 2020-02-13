import { Component, OnInit, Input } from '@angular/core';

import { HttpService } from '../service/http-service.service';
import { FormsModule }   from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  name:string;
  constructor(private httpService:HttpService ) { }
  onSubmit(){
    this.httpService.login()
    console.log("hello!")
  }
  onPost(){
    console.log(Input.name)
    var message=this.httpService.loginpost()
    console.log(message)
  }
  ngOnInit() {
  }

}