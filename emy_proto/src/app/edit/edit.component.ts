import {Component, ElementRef, ViewChild} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {API, DisplayType, Song} from "../global";

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent {
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
  songs_from: string[] = [];
  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      http.get(API + "one/" + params['id']).subscribe(data => {
        // @ts-ignore
        this.sample = data
        this.songs_from = this.sample.album_comment.split('[SONG]');
        this.songs_from.forEach(s => {
          this.sample.album_comment = this.songs_from[0]
          if (this.songs_from.indexOf(s) != 0) {
            let split = s.split("[SECTION]");
            this.songs.push({comment: split[2], id: this.getNextId(), link: split[1], title: split[0]})
          }
        })
      });
    })
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
    const url = API + "edit/"
      + "?artist_name=" + this.artistName.nativeElement.value
      + "&post_id=" + this.sample.id
      + "&artist_image=" + this.ArtistImage.nativeElement.value
      + "&artist_comment=" + this.ArtistComment.nativeElement.value
      + "&album_name=" + this.AlbumName.nativeElement.value
      + "&album_image=" + this.AlbumImage.nativeElement.value
      + "&album_comment=" + comment
    if (confirm("This will edit this entry, confirm?") && this.access) {
      this.http.get(url).subscribe(() => this.router.navigateByUrl("display/" + this.sample.id).then());
    } else if (!this.access) alert("You do not have admin privileges!")
  }
}
