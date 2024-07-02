import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PostComponent} from "./post/post.component";
import {DisplayComponent} from "./display/display.component";
import {EditComponent} from "./edit/edit.component";
import {PrevComponent} from "./prev/prev.component";

const routes: Routes = [
  {path: 'home', component: PrevComponent},
  {path: 'post', component: PostComponent},
  {path: 'display/:id', component: DisplayComponent},
  {path: 'edit/:id', component: EditComponent},
  {path: '**', redirectTo: '/home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
