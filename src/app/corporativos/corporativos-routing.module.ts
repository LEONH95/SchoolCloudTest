import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CorporativosComponent } from './corporativos.component';
import { CorporativosDetailComponent } from './corportativos-detail/corporativos-detail.component';


const routes: Routes = [
  {
    path: '',
    component: CorporativosComponent,
    data: {
      title: 'Corporativos'
    }
  },
  {path: 'detalle/:id', component: CorporativosDetailComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CorporativosRoutingModule { }
