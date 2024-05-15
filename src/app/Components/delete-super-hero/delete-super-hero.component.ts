import { Component, Inject, Optional } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SuperheroesService } from '../../services/superheroes.service';
import { SpinnerService } from '../../services/spinner.service';

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
    private superheroService: SuperheroesService,
    private spinnerService: SpinnerService
  ) {}

  deleteHero() {
    this.spinnerService.$spinner.next(true);

    this.superheroService.deleteHero(this.data.id).subscribe((result) => {
      if (result === true) {
        this.spinnerService.$spinner.next(false);

        this.closeDialog();
      } else {
        alert('something went wrong');
        this.spinnerService.$spinner.next(false);
      }
    });
  }
  closeDialog(): void {
    this.dialogRef.close();
  }
}
