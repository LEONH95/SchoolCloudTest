import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";
import { Contacto, Corporativo, CorporativoList, CorporativoModel } from '../_models/corporativo';

@Injectable({
  providedIn: 'root'
})
export class CorporativosService {

  
  corporativos = environment.apiURL+'/corporativos';
  contactos = environment.apiURL+'/contactos';
  options: any;


  constructor(private http: HttpClient) {

  }

  headers: HttpHeaders = new HttpHeaders({
    "Content-Type": "application/json"
  });

  listCorporativos(): Observable<any> {
    return this.http.get<CorporativoList[]>(this.corporativos, {headers: this.headers}).pipe(
      map((res:any) => { 
        return res.data.map(element => {
          return new CorporativoList(element);
        }
      )})
    );
  }

  detailCorporativos(id): Observable<Corporativo> {
    return this.http.get<Corporativo>( `${this.corporativos}/${id}` , {headers: this.headers}).pipe(
      map((res:any) => res.data.corporativo)
    );
  }

  saveDetailCorporativos(id, corporativo: CorporativoModel): Observable<Corporativo> {
    return this.http.put<CorporativoModel>( `${this.corporativos}/${id}`, corporativo, {headers: this.headers}).pipe(
      map((res:any) => res)
    );
  }

  saveContactos(contacto: Contacto): Observable<Contacto> {
    return this.http.post<Contacto>( this.contactos, contacto, {headers: this.headers}).pipe(
      map((res:any) => res)
    );
  }

  editContactos(id, contacto: Contacto): Observable<Contacto> {
    return this.http.put<Contacto>( `${this.contactos}/${id}`, contacto, {headers: this.headers}).pipe(
      map((res:any) => res)
    );
  }

  deleteContactos(id): Observable<any> {
    console.log(id);
    return this.http.delete<any>( `${this.contactos}/${id}`, {headers: this.headers}).pipe(
      map((res:any) => res)
    );
  }

}
