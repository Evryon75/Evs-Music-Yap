import { Component } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {API} from "./global";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  access: boolean = false;
  constructor(private http: HttpClient) {
    this.http.get(API + "access/").subscribe(result => {
      //@ts-ignore
      this.access = result.message == "Access granted";
    });
  }
}
