import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DragulaModule } from 'ng2-dragula';

const routes: Routes = [];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
