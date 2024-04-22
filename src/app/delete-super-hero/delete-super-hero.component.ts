import { Component, Inject, Optional } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SuperheroesService } from '../services/superheroes.service';

@Component({
  selector: 'app-delete-super-hero',
  standalone: true,
  imports: [],
  templateUrl: './delete-super-hero.component.html',
  styleUrl: './delete-super-hero.component.css',
})
export class DeleteSuperHeroComponent {
  constructor(
    @Optional() public dialogRef: MatDialogRef<DeleteSuperHeroComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: number },
    private superheroService: SuperheroesService
  ) {}

  deleteHero() {
    this.superheroService.deleteHero(this.data.id).subscribe((result) => {
      if (result === true) {
        alert('hero deleted');
        this.closeDialog();
      } else {
        alert('something went wrong');
      }
    });
  }
  closeDialog(): void {
    this.dialogRef.close();
  }
}
