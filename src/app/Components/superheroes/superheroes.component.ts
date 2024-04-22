import { Component, Input, OnInit } from '@angular/core';
import {
  SuperheroesService,
  SuperHero,
} from '../../services/superheroes.service';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { EditFormComponent } from '../../edit-form/edit-form.component';
import { DeleteSuperHeroComponent } from '../../delete-super-hero/delete-super-hero.component';

@Component({
  selector: 'app-superheroes',
  standalone: true,
  imports: [MatCardModule, MatDialogModule],
  templateUrl: './superheroes.component.html',
  styleUrls: ['./superheroes.component.css'],
})
export class SuperheroesComponent {
  @Input() superHeroe: SuperHero = {
    id: 0,
    name: '',
  };
  constructor(
    private dialog: MatDialog,
    private superheroService: SuperheroesService
  ) {}

  openEditModal() {
    const dialogRef = this.dialog.open(EditFormComponent, {
      width: '600px',
      disableClose: true,
      data: {
        id: this.superHeroe.id,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
    });
  }

  openDeleteModal() {
    const dialogRef = this.dialog.open(DeleteSuperHeroComponent, {
      width: '600px',
      disableClose: true,
      data: {
        id: this.superHeroe.id,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
    });
  }
}
