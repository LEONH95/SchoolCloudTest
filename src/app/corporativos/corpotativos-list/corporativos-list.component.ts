import { Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from "@angular/core";
import { DatatableComponent, ColumnMode } from "@swimlane/ngx-datatable";
import { CorporativosService } from "../_services/corporativos.service";
import { Corporativo, CorporativoList } from "../_models/corporativo";
import { Observable, Subscriber, Subscription } from "rxjs";

@Component({
  selector: "app-corporativos-list",
  templateUrl: "./corporativos-list.component.html",
  styleUrls: [
    "./corporativos-list.component.scss",
    "/assets/sass/libs/datatables.scss",
  ],
  encapsulation: ViewEncapsulation.None,
})
export class CorporativoListComponent implements OnInit, OnDestroy {
  @ViewChild(DatatableComponent) table: DatatableComponent;

  // row data
  public rows$: Observable<any>;
  public ColumnMode = ColumnMode;
  public limitRef = 10;

  // column header
  public columns = [
    { name: "CORPORATIVO", prop: "nombreCorto" },
    { name: "URL", prop: "url" },
    { name: "INCORPORACIÓN", prop: "incorporacion" },
    { name: "CREADO EL", prop: "creadoEl" },
    { name: "ASIGNADO A", prop: "asignadoA" },
    { name: "STATUS", prop: "status" },
    { name: "ACCIONES" },
  ];

  // private
  private tempData = [];

  constructor(private corporativosService: CorporativosService) {
    this.rows$ = this.corporativosService.listCorporativos();
    this.tempData = null;
  }

  // Public Methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * filterUpdate
   *
   * @param event
   */
  filterUpdate(event) {
    const val = event.target.value.toLowerCase();

    // filter our data
    const temp = this.tempData.filter(function (d) {
      return d.Username.toLowerCase().indexOf(val) !== -1 || !val;
    });

    // update the rows
    // this.rows = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }

  /**
   * updateLimit
   *
   * @param limit
   */
  updateLimit(limit) {
    this.limitRef = limit.target.value;
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {}

}
