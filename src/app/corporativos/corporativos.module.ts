import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CorporativosComponent } from './corporativos.component';
import { CorporativosRoutingModule } from './corporativos-routing.module';
import { CorporativoListComponent } from './corpotativos-list/corporativos-list.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { NgSelectModule } from "@ng-select/ng-select";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { CorporativosDetailComponent } from './corportativos-detail/corporativos-detail.component';


@NgModule({
  declarations: [CorporativosComponent, CorporativoListComponent, CorporativosDetailComponent],
  imports: [
    CommonModule,
    CorporativosRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    NgSelectModule,
    NgxDatatableModule
  ]
})
export class CorporativosModule { }
