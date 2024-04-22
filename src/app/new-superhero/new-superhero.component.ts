import { Component, Inject, Optional } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SuperheroesService } from '../services/superheroes.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-new-superhero',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './new-superhero.component.html',
  styleUrl: './new-superhero.component.css',
})
export class NewSuperheroComponent {
  constructor(
    @Optional() public dialogRef: MatDialogRef<NewSuperheroComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: number },
    private superheroService: SuperheroesService
  ) {}

  newHero = new FormControl('');

  saveNewHero() {
    if (this.newHero.value) {
      const hero = { name: this.newHero.value };
      this.superheroService.addHero(hero).subscribe({
        next: (success) => {
          console.log('Hero added successfully:', success);
          this.closeDialog(); // Opcionalmente cerrar el diálogo después de guardar
        },
        error: (error) => {
          console.error('Failed to add hero:', error);
        },
      });
    }
  }
  closeDialog(): void {
    this.dialogRef.close();
  }
}
