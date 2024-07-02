export const API = "https://emy.osu.wtf/"
export interface Song {
  title: string;
  link: string;
  comment: string;
  id: number;
}
export interface DisplayType {
  id: number,
  artist_name: string,
  artist_image: string,
  artist_comment: string,
  album_name: string,
  album_image: string,
  album_comment: string
}
