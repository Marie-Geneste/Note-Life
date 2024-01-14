import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, interval, map, switchMap, tap, throwError } from 'rxjs';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `http://localhost:3300`

  constructor(private http: HttpClient, private router: Router) { 
    // Vérifier la validité du token toutes les heures
    interval(3600000).pipe(
      switchMap(() => this.checkTokenValidity())
    ).subscribe(
      (isValid) => {
        if (!isValid) {
          // Déconnecter l'utilisateur s'il n'est plus valide
          this.logout();
        }
      }
    );
  }

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

  checkTokenValidity(): Observable<boolean> {
    const token = localStorage.getItem('token');
    console.log(token);
    
    if (!token) {
      return new Observable(observer => observer.next(false));
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    
    return this.http.get<any>(`${this.apiUrl}/user/me`, { headers }).pipe(
      // La réponse ne contient pas forcément de données, on utilise simplement le statut HTTP pour déterminer la validité du token
      catchError((error: any) => {
        if (error.status === 401) {
          // Token non valide
          return throwError(false);
        } else {
          // Gérer d'autres erreurs ici si nécessaire
          return throwError(error);
        }
      }),
      map(() => true) // Utilisation de map pour transformer la valeur en 'true' après catchError
    );
  }

  logout(): void {
    // Supprimer le token du localStorage lors de la déconnexion
    localStorage.removeItem('token');
    console.log("Déconnexion réussie");
    
    // Rediriger vers la page de connexion après la déconnexion
    this.router.navigate(['']); 
  }

  modifyPseudo(newPseudo: string): Observable<any> {
    const token = sessionStorage.getItem('token');

    // Vérifie si le token est présent
    if (!token) {
      return new Observable(observer => observer.error('Token manquant'));
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const body = { pseudo: newPseudo };
    
    return this.http.patch<any>(`${this.apiUrl}/user/me`, body, { headers });
  }

  deleteUser():  Observable<any> {
    const token = sessionStorage.getItem('token');
    
    // Vérifie si le token est présent
    if (!token) {
      return new Observable(observer => observer.error('Token manquant'));
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    
    return this.http.delete<any>(`${this.apiUrl}/user/me`, { headers });
  }
}
