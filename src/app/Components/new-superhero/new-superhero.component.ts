import { Component, Inject, Optional, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SuperheroesService } from '../../services/superheroes.service';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SpinnerService } from '../../services/spinner.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-new-superhero',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './new-superhero.component.html',
  styleUrl: './new-superhero.component.css',
})
export class NewSuperheroComponent {
  constructor(
    @Optional() public dialogRef: MatDialogRef<NewSuperheroComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: number },
    private superheroService: SuperheroesService,
    private spinnerService: SpinnerService,
    private _snackBar: MatSnackBar
  ) {}

  newHero: string = '';

  saveNewHero() {
    if (this.newHero) {
      const hero = { name: this.newHero };
      this.spinnerService.$spinner.next(true);
      this.superheroService.addHero(hero).subscribe({
        next: (success) => {
          console.log('Hero added successfully:', success);
          this.closeDialog();
          this.openToast('success', 'Hero added successfully');
        },
        error: (error) => {
          console.error('Failed to add hero:', error);
        },
        complete: () => {
          this.spinnerService.$spinner.next(false);
        },
      });
    }
  }
  closeDialog(): void {
    this.dialogRef.close();
  }

  openToast(result: string, message: string): void {
    this._snackBar.open(message, 'X', {
      horizontalPosition: 'center',
      verticalPosition: 'top',
      duration: 3000,
      panelClass: result,
    });
  }
}
