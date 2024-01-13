import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `http://localhost:3300`

  constructor(private http: HttpClient) { }

  signup(email: string, password: string, passwordConfirm: string, pseudo: string) {
    return this.http.post<any>(`${this.apiUrl}/user`, { email, password, passwordConfirm, pseudo });
  }

  login(email: string, password: string) {
    return this.http.post<any>(`${this.apiUrl}/login`, { email, password }).pipe(
    tap(response => {
      // Stocker le token dans la session storage après une connexion réussie
      if (response && response.token) {
        sessionStorage.setItem('token', response.token);
      }
    })
    );
  }

  getOneUser(): Observable<any> {
    const token = sessionStorage.getItem('token');
    
    // Vérifie si le token est présent
    if (!token) {
      return new Observable(observer => observer.error('Token manquant'));
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    
    return this.http.get<any>(`${this.apiUrl}/user/me`, { headers });
  }
}
