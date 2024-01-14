import { Component } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-deleted-profile-dialog',
  templateUrl: './deleted-profile-dialog.component.html',
  standalone: true,
  imports: [MatButtonModule],
  styleUrls: ['./deleted-profile-dialog.component.scss']
})
export class DeletedProfileDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DeletedProfileDialogComponent>,
    public dialog: MatDialog,
    private authService: AuthService,
    private router: Router
    ) {}

  closeDialog() {
    this.dialog.closeAll()
  }

  deleteUser(): void {
    this.authService.deleteUser().subscribe(
      (response) => {
        console.log("Utilisateur supprimé");
        this.router.navigate([''])
        this.closeDialog()
      },
      (error) => {
        console.error('Erreur lors de la suppression de l\'utilisateur', error);
      }
    );
    
  }
}