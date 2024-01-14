import { Component, ElementRef, ViewChild } from '@angular/core';
import {
  MatDialog,
} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { DeletedProfileDialogComponent } from '../deleted-profile-dialog/deleted-profile-dialog.component';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss'],
  standalone: true,
  imports: [MatButtonModule],
})
export class ProfilePageComponent {
  email!: string;
  password!: string;
  pseudo!: string;
  user: any;
  
  constructor(public dialog: MatDialog,
              private authService: AuthService
              ) {}

  ngOnInit(): void {
    this.authService.getOneUser().subscribe(
      (user) => {
        this.email = user.email;
        this.password = '';
        this.pseudo = user.pseudo;
      },
      (error) => {
        console.error('Erreur lors de la récupération de l\'utilisateur :', error);
      }
    );
  }
  
  openDialog(): void {
    this.dialog.open(DeletedProfileDialogComponent, {
      width: '35vw',
    });
  }

  logout(): void {
    this.authService.logout();
  }

  @ViewChild('pseudoInput') pseudoInput!: ElementRef<HTMLInputElement>;

  handleEditClick(): void {
    const modifiedPseudo = this.pseudoInput.nativeElement.value;
    this.authService.modifyPseudo(modifiedPseudo).subscribe(
      (response) => {
        this.pseudo = modifiedPseudo;
        console.log('Pseudo modifié avec succès !');
      },
      (error) => {
        console.error('Erreur lors de la modification du pseudo :', error);
      }
    );
  }
}


