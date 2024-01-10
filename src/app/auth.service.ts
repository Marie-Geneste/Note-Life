import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


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
    return this.http.post<any>(`${this.apiUrl}/login`, { email, password });
  }
}
