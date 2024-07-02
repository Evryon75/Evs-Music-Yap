import {Component} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {DomSanitizer} from "@angular/platform-browser";
import {ActivatedRoute, Router} from "@angular/router";
import {API, DisplayType} from "../global";

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent {
  sample: DisplayType = {
    id: 0,
    album_comment: "",
    album_image: "",
    album_name: "",
    artist_comment: "",
    artist_image: "",
    artist_name: ""
  };
  access: boolean = false;
  songs: string[] = [];
  constructor(private http: HttpClient, protected sanitizer: DomSanitizer, private route: ActivatedRoute, private router: Router) {
    this.route.params.subscribe(p => {
      this.sample.id = p['id'];
      http.get(API + "one/" + this.sample.id).subscribe(data => {
        // @ts-ignore
        this.sample = data
        this.songs = this.sample.album_comment.split('[SONG]');
      });
    })
    http.get(API + "access/").subscribe(result => {
      //@ts-ignore
      this.access = result.message == "Access granted";
    });
  }
  embedify(link: string) {
    let split = link.split("/");
    return "https://open.spotify.com/embed/" + split[3] + "/" + split[4].split("?")[0] + "?" + "utm_source=generator"
  }
  edit() {
    this.router.navigateByUrl("edit/" + this.sample.id).then()
  }
  remove() {
    if (confirm("This will delete this entry, confirm?") && this.access) {
      const url = API + "delete/" + this.sample.id
      this.http.get(url).subscribe()
      this.router.navigateByUrl("home").then()
    } else if (!this.access) alert("You do not have admin privileges!")
  }
}
