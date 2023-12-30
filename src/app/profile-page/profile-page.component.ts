import { Component } from '@angular/core';
import {
  MatDialog,
} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { DeletedProfileDialogComponent } from '../deleted-profile-dialog/deleted-profile-dialog.component';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss'],
  standalone: true,
  imports: [MatButtonModule],
})
export class ProfilePageComponent {
  constructor(public dialog: MatDialog) {}

  openDialog(): void {
    this.dialog.open(DeletedProfileDialogComponent, {
      width: '35vw',
    });
  }
}


