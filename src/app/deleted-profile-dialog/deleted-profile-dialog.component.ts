import { Component } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';


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
    public dialog: MatDialog
    ) {}

  closeDialog() {
    this.dialog.closeAll()
  }
}