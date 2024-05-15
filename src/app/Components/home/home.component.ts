import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { SuperheroesComponent } from '../superheroes/superheroes.component';
import {
  Pageable,
  SuperHero,
  SuperheroesService,
} from '../../services/superheroes.service';
import { CommonModule, NgFor } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { NewSuperheroComponent } from '../new-superhero/new-superhero.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ThemePalette } from '@angular/material/core';
import { SpinnerService } from '../../services/spinner.service';
import { debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    SuperheroesComponent,
    MatInputModule,
    MatButtonModule,
    NgFor,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    CommonModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  heroes: Pageable<SuperHero> = {
    data: [],
    pageSize: 0,
    pageNumber: 0,
    totalElements: 0,
    totalPages: 0,
    lastPage: false,
  };
  search = new FormControl('');
  color: ThemePalette = 'primary';
  showSpinner: boolean = true;

  constructor(
    private superheroService: SuperheroesService,
    private spinnerService: SpinnerService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadHeroes(0);
    this.search.valueChanges
      .pipe(debounceTime(1000), distinctUntilChanged())
      .subscribe((substring) => {
        if (substring !== null) {
          this.loadHeroes(0);
        }
      });

    this.spinnerService.$spinner.subscribe((value: boolean) => {
      this.showSpinner = value;
    });
  }
  name = new FormControl('');

  loadHeroes(pageNumber: number): void {
    let query: string = '';
    if (this.search.value) {
      query = this.search.value;
    }
    this.showSpinner = true;
    console.log(pageNumber);
    this.superheroService
      .getAllHeroes({ pageSize: 4, pageNumber, query })
      .subscribe((response) => {
        console.log(response);
        this.heroes = response;
        this.showSpinner = false;
      });
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

  nextPage() {
    this.loadHeroes(this.heroes.pageNumber + 1);
  }

  previousPage() {
    this.loadHeroes(this.heroes.pageNumber - 1);
  }
}
