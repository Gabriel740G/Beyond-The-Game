import { Injectable } from '@angular/core';
import { Empresa } from '../Empresa';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Response } from '../Response';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {
  //private baseApiUrl = environment.baseApiUrl;
  //private apiUrl = `${this.baseApiUrl}/api/Empresa`;

  constructor(private http: HttpClient) { }

  getEmpresas(): Observable<Empresa[]> {
    const url = 'https://localhost:7043/api/Empresa';
    return this.http.get<Empresa[]>(url);
  }

  getEmpresa(): Observable<Empresa> {
    const url = 'https://localhost:7043/api/Empresa';
    return this.http.get<Empresa>(url);
  }

  searchEmpresas(termoPesquisa: string): Observable<Empresa[]> {
    const url = 'https://localhost:7043/api/Empresa';
    
    // Configurar parâmetros de pesquisa
    const params = new HttpParams().set('termo', termoPesquisa);

    // Fazer a solicitação HTTP com parâmetros de pesquisa
    return this.http.get<Empresa[]>(url, { params });
  }

  getProfileById(id: number): Observable<Empresa> {
    const url = `https://localhost:7043/api/Empresa/${id}`;
    return this.http.get<Empresa>(url);
  }

  updateProfile(id: number, updatedProfile: Empresa): Observable<Empresa> {
    const url = `https://localhost:7043/api/Empresa/${id}`;
    return this.http.put<Empresa>(url, updatedProfile);
  }

  removeEmpresa(id: number) {
    const url = `https://localhost:7043/api/Empresa/${id}`;
    return this.http.delete(url);
  }

  updateEmpresa(empresa: Empresa, id: number): Observable<Empresa> {
    const url = `https://localhost:7043/api/Empresa/${id}`;
    return this.http.put<Empresa>(url, empresa);
  }
}
