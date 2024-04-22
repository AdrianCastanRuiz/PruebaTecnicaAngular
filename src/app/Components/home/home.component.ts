import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { SuperheroesComponent } from '../superheroes/superheroes.component';
import {
  SuperHero,
  SuperheroesService,
} from '../../services/superheroes.service';
import { NgFor } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { NewSuperheroComponent } from '../../new-superhero/new-superhero.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    SuperheroesComponent,
    MatInputModule,
    MatButtonModule,
    NgFor,
    ReactiveFormsModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  heros: SuperHero[] = [];
  search = new FormControl('');

  constructor(
    private superheroService: SuperheroesService,
    private dialog: MatDialog
  ) {}
  ngOnInit(): void {
    this.loadHeroes();
    this.search.valueChanges.subscribe((substring) => {
      console.log(substring);
      if (substring !== null) {
        this.superheroService
          .searchHeroes(substring)
          .subscribe((superHeros) => {
            this.heros = superHeros;
          });
      }
    });
  }
  name = new FormControl('');

  loadHeroes(): void {
    this.superheroService
      .getAllHeroes()
      .subscribe((heroes) => (this.heros = heroes));
  }

  openNewHeroModal() {
    const dialogRef = this.dialog.open(NewSuperheroComponent, {
      width: '600px',
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      console.log(result);
    });
  }
}
