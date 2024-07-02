import { Component } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {DomSanitizer} from "@angular/platform-browser";
import {Router} from "@angular/router";
import {API, DisplayType} from "../global";

@Component({
  selector: 'app-prev',
  templateUrl: './prev.component.html',
  styleUrls: ['./prev.component.css']
})
export class PrevComponent {
  sample: DisplayType[] = [];
  constructor(http: HttpClient, protected sanitizer: DomSanitizer, private router: Router) {
    http.get(API + "previews/").subscribe(data => {
      // @ts-ignore
      this.sample = data
    });
  }
  display(id: number) {
    this.router.navigateByUrl("display/" + id).then()
  }
}
