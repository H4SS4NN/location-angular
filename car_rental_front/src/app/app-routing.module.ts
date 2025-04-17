import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AdminComponent } from './pages/admin/admin.component';
import { DetailsComponent } from './pages/details/details.component';
import { AddcarComponent } from './pages/addcar/addcar.component';
import { EditcarComponent } from './pages/editcar/editcar.component';

const routes: Routes = [
  {
    path : '',
    component : HomeComponent
  },
  {
    path: 'admin',
    component : AdminComponent
  },
  {
    path: 'details/:id',
    component: DetailsComponent
  },
  {
    path:'addcar',
    component : AddcarComponent
  },
  {
    path: 'editcar/:id',
    component: EditcarComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
