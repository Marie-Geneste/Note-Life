import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.scss']
})
export class SignupPageComponent {
  
  signupForm!: FormGroup;
  errorMsg!: string;

  constructor(private authService: AuthService,
              private router: Router,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required,  Validators.minLength(6)]],
      passwordConfirm: [null, Validators.required],
      pseudo: [null, Validators.required]
    }, { validators: this.passwordsMatchValidator })
  }

  onSubmit() {
    const email = this.signupForm.get('email')!.value;
    const password = this.signupForm.get('password')!.value;
    const passwordConfirm = this.signupForm.get('passwordConfirm')!.value;
    const pseudo = this.signupForm.get('pseudo')!.value;

    console.log(email, password, passwordConfirm, pseudo);

    this.authService.signup(email, password, passwordConfirm, pseudo).subscribe(
      (response) => {
        // Gérer la réponse après l'inscription réussie
        console.log('Inscription réussie:', response);
        this.router.navigate(['/']);
      },
      (error) => {
        // Gérer les erreurs lors de l'inscription
        this.errorMsg = error.message;
        console.error('Erreur lors de l\'inscription:', error);
      }
    );
  }

  passwordsMatchValidator(control: AbstractControl) {
    const password = control.get('password');
    const passwordConfirm = control.get('passwordConfirm');

    if (password && passwordConfirm && password.value !== passwordConfirm.value) {
      passwordConfirm.setErrors({ passwordsNotMatch: true });
      return { passwordsNotMatch: true };
    } else {
      return null;
    }
  }
}
