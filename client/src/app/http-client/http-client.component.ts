import { Component, OnInit } from '@angular/core';
import { ConfigService } from './http-client.service';


@Component({
  selector: 'app-http-client',
  templateUrl: './http-client.component.html',
  styleUrls: ['./http-client.component.css']
})
export class HttpClientComponent implements OnInit {
  config: Config;
  
  configService:ConfigService;
  showConfig() {
    this.configService.getConfig()
      .subscribe((data: Config) => this.config = {
          heroesUrl: data['heroesUrl'],
          textfile:  data['textfile']
      });
  }
  ngOnInit() {}
}
export interface Config {
  heroesUrl: string;
  textfile: string;
}