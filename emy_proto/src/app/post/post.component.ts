import {Component, ViewChild} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {API, Song} from "../global";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent {
  // @ts-ignore
  @ViewChild("artistName") artistName: ElementRef;
  // @ts-ignore
  @ViewChild("ArtistImage") ArtistImage: ElementRef;
  // @ts-ignore
  @ViewChild("ArtistComment") ArtistComment: ElementRef;
  // @ts-ignore
  @ViewChild("AlbumName") AlbumName: ElementRef;
  // @ts-ignore
  @ViewChild("AlbumImage") AlbumImage: ElementRef;
  // @ts-ignore
  @ViewChild("AlbumComment") AlbumComment: ElementRef;
  songs: Song[] = [];
  access: boolean = false;
  constructor(private http: HttpClient, private router: Router) {
    http.get(API + "access/").subscribe(result => {
      //@ts-ignore
      this.access = result.message == "Access granted";
    });
  }
  getNextId(): number {
    let id = 0;
    this.songs.forEach(song => {
      if (song.id >= id) id = song.id + 1;
    })
    return id;
  }
  addSong() {
    this.songs.push({id: this.getNextId(), comment: "", link: "", title: ""})
  }
  confirmation() {
    let comment: string = this.AlbumComment.nativeElement.value;
    this.songs.forEach(song => {
      comment += "[SONG]" +
        song.title + "\n" +
        "[SECTION]" + song.link + "\n" +
        "[SECTION]" + song.comment + "\n"
    })
    const url = API + "post/"
    + "?artist_name=" + this.artistName.nativeElement.value
    + "&artist_image=" + this.ArtistImage.nativeElement.value
    + "&artist_comment=" + this.ArtistComment.nativeElement.value
    + "&album_name=" + this.AlbumName.nativeElement.value
    + "&album_image=" + this.AlbumImage.nativeElement.value
    + "&album_comment=" + comment
    if (confirm("This will post a new entry, confirm?") && this.access) {
      this.http.get(url).subscribe(() => this.router.navigateByUrl("home"))
    } else if (!this.access) alert("You do not have admin privileges!")
  }
}

