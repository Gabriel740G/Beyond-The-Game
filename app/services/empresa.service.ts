import { Injectable } from '@angular/core';
import { Empresa } from '../Empresa';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  constructor(private http: HttpClient) { }

  getEmpresas(): Observable<Empresa[]> {
    const url = 'https://localhost:7043/api/Empresa';
    return this.http.get<Empresa[]>(url);
  }

  getEmpresaById(id: number): Observable<Empresa> {
    const url = `https://localhost:7043/api/Empresa/${id}`;
    return this.http.get<Empresa>(url);
  }

  obterIdEmpresaDoToken(): number | null {
    const token = localStorage.getItem('token');
    if (token) {
      const tokenDecodificado = atob(token.split('.')[1]); // Decodifica o token base64
      const tokenObj = JSON.parse(tokenDecodificado);
      return tokenObj.id; // Supondo que o ID do usuário está no token
    }
    return null;
  }

  searchEmpresas(termoPesquisa: string): Observable<Empresa[]> {
    const url = 'https://localhost:7043/api/Empresa';
    const params = new HttpParams().set('termo', termoPesquisa);
    return this.http.get<Empresa[]>(url, { params });
  }

  removeEmpresa(id: number) {
    const url = `https://localhost:7043/api/Empresa/${id}`;
    return this.http.delete(url);
  }

  updateEmpresa(id: number, empresa: Empresa): Observable<Empresa> {
    const url = `https://localhost:7043/api/Empresa/${id}`;
    return this.http.put<Empresa>(url, empresa);
  }
}
