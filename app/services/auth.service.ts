import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Empresa } from '../Empresa';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedInUser: string | null;

  constructor(private http: HttpClient, private router: Router) { 
    this.loggedInUser = localStorage.getItem('user');
  }

  login(nome: string, senha: string): Observable<any> {
    const loginData = { nome, senha };
    this.loggedInUser = nome;
    localStorage.setItem('user', nome);
    return this.http.post('https://localhost:7043/api/auth/login', loginData);
  }

  logout(): void {
    const confirmation = confirm('Você quer fazer logout?');
    if(confirmation) {
      localStorage.removeItem('token');
      this.loggedInUser = null;
      localStorage.removeItem('user');
      this.router.navigate(['/login']);
    }
  }

  getLoggedInUser(): string | null {
    return this.loggedInUser;
  }
 
}


