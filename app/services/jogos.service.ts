import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';

import { Jogo } from '../Jogo';
import { Response } from '../Response';

import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class JogosService {
  private openModalSource = new Subject<number>();

  constructor(private http: HttpClient) { }

  getJogos(): Observable<Jogo[]> {
    const url = 'https://localhost:7043/api/Jogo';
    return this.http.get<Jogo[]>(url);
  }

  getJogoPorId(jogoId: number): Observable<Jogo> {
    const url = `https://localhost:7043/api/Jogo/${jogoId}`;
    return this.http.get<Jogo>(url);
  }

  removeJogo(id: number) {
    const url = `https://localhost:7043/api/Jogo/${id}`;
    return this.http.delete(url);
  }

  updateJogo(jogo: Jogo, id: number): Observable<Jogo> {
    const url = `https://localhost:7043/api/Jogo/${id}`;
    return this.http.put<Jogo>(url, jogo);
  }
}
