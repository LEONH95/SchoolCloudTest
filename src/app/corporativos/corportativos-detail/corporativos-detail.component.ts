import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CorporativosService } from '../_services/corporativos.service';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Corporativo, CorporativoModel } from '../_models/corporativo';
import { NgbDateStruct, NgbDatepickerI18n, NgbCalendar} from '@ng-bootstrap/ng-bootstrap';
import { getObjectDate, getStringDate } from '../../helpers/util/dateUtil';
import { DatatableComponent, ColumnMode } from '@swimlane/ngx-datatable';
import { forkJoin, Observable, of, zip } from 'rxjs';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-corporativos-detail',
  templateUrl: './corporativos-detail.component.html',
  styleUrls: ['./corporativos-detail.component.scss']
})
export class CorporativosDetailComponent implements OnInit {
  @ViewChild(DatatableComponent) table: DatatableComponent;

  // row data
  public rows$: Observable<any>;
  public ColumnMode = ColumnMode;

  // column header
  public columns = [
    { name: "NOMBRE", prop: "S_Nombre" },
    { name: "PUESTO", prop: "S_Puesto" },
    { name: "TELÉFONO", prop: "N_TelefonoFijo" },
    { name: "CELULAR", prop: "N_TelefonoMovil" },
    { name: "EMAIL", prop: "S_Email" },
    { name: "OBSERVACIONES", prop: "S_Comentarios" },
    { name: "ACCIONES" },
  ];

  public id: string;
  public img: string = '../../assets/img/error/not-found.jpeg';
  public title: string = '';
  public fkAsignado: number;
  public isEdit: boolean = true;

  public corporativoForm = this.fb.group({
    nombreCorto: {value: '', disabled: true},
    fechaIncorporacion: {value: '', disabled: true},
    status: {value: '', disabled: true},
    nombreCompleto: {value: '', disabled: true},
    urlDelSistema: {value: '', disabled: true},  
  });

  public contactosForm = this.fb.group({
    id: [''],
    S_Nombre: [''],
    S_Puesto: [''],
    S_Comentarios: [''],
    N_TelefonoFijo: [null],
    N_TelefonoMovil: [null],
    S_Email: [''],
    tw_corporativo_id: [null]
  });

  public statusList =  [
    { value: 1, name: 'Activo' },
    { value: 0, name: 'Inactivo' }
  ];

  public form = this.corporativoForm.controls;
  corporativo:CorporativoModel;

  constructor(private corporativosService: CorporativosService,  private route: ActivatedRoute, private fb: FormBuilder, private cdr: ChangeDetectorRef) {
    this.id = this.route.snapshot.paramMap.get('id')!;
    console.log(this.id);
    this.refreshData();
  }

  ngOnInit(): void {}

  onSubmit() {
    console.log(this.form["status"].value);
    this.corporativo = new CorporativoModel(this.id, this.form["nombreCorto"].value, this.form["nombreCompleto"].value, this.img, this.form["status"].value.value, getStringDate(this.form["fechaIncorporacion"].value), this.fkAsignado);
    this.corporativosService.saveDetailCorporativos(this.id, this.corporativo).subscribe(
      res => {
        console.log(res);
        this.isOnEdit();
      }
    );
  }

  isOnEdit(){
    this.isEdit = !this.isEdit;
    if(!this.isEdit){
      this.corporativoForm.enable();
    }else{
      this.corporativoForm.disable();
    }
  }

  deleteContacto(id){
    this.corporativosService.deleteContactos(id).subscribe(
      res => {
        this.refreshData();
      });
  }

  editContacto(contacto){
    this.contactosForm.setValue(contacto);
  }

  onSubmitContactos(){
    this.contactosForm.controls["tw_corporativo_id"].setValue(this.id);
    if(this.contactosForm.controls["id"].value){
      this.corporativosService.editContactos(this.contactosForm.controls["id"].value, this.contactosForm.value).subscribe(
        res=>{
          this.refreshData();
          this.contactosForm.reset();
        }
      )
    }else{
      this.corporativosService.saveContactos(this.contactosForm.value).subscribe(
        res=>{
          this.refreshData();
          this.contactosForm.reset();
        }
      )
    }
  }
  
  refreshData(){
  this.corporativosService.detailCorporativos(this.id).subscribe(
    (res: Corporativo) => {
      console.log(res);
      this.img = res.S_LogoURL;
      this.title = res.S_NombreCorto;
      this.fkAsignado = res.FK_Asignado_id;
      this.form["nombreCorto"].setValue(res.S_NombreCorto);
      this.form["fechaIncorporacion"].setValue(getObjectDate(res.D_FechaIncorporacion));
      this.form["status"].setValue({value: res.S_Activo, name: res.S_Activo === 1?'Activo':'Inactivo'});
      this.form["nombreCompleto"].setValue(res.S_NombreCompleto);
      this.form["urlDelSistema"].setValue(res.S_SystemUrl);
      this.rows$ = of(res.tw_contactos_corporativo);
      this.cdr.detectChanges();
    }
  )
  }

}
