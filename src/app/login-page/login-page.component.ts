import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {

  loginForm!: FormGroup;
  errorMsg!: string;
  isInvalidCredentials = false;

  constructor(private authService: AuthService,
              private router: Router,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: [null, Validators.required],
      password: [null, Validators.required],
    })
  }

  onLogin() {
    const email = this.loginForm.get('email')!.value;
    const password = this.loginForm.get('password')!.value;

  this.authService.login(email, password).subscribe(
    (response) => {
      // Gérer la réponse après la connexion réussie
      console.log('Connexion réussie:', response);
      this.router.navigate(['/profile']);
    },
    (error) => {
      // Gérer les erreurs lors de la connexion
      this.errorMsg = error.message;
      this.isInvalidCredentials = true;
      console.error('Erreur lors de la connexion:', error);
    }
    );
  }
}
