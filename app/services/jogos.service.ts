import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Jogo } from '../Jogo';

@Injectable({
  providedIn: 'root'
})
export class JogosService {

  constructor(private http: HttpClient) { }

  getJogos(): Observable<Jogo[]> {
    const url = 'https://localhost:7043/api/Jogo';
    return this.http.get<Jogo[]>(url);
  }

  getJogo(id: number): Observable<Jogo> {
    const url = `https://localhost:7043/api/Jogo/${id}`;
    return this.http.get<Jogo>(url);
  }

  removeJogo(id: number) {
    const url = `https://localhost:7043/api/Jogo/${id}`;
    return this.http.delete(url);
  }

  updateJogo(id: number, jogo: Jogo): Observable<Jogo> {
    const url = `https://localhost:7043/api/Jogo/${id}`;
    return this.http.put<Jogo>(url, jogo);
  }
}
