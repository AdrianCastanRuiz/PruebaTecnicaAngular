import { Component, Inject, OnInit, Optional } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { SuperheroesService, SuperHero } from '../services/superheroes.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './edit-form.component.html',
  styleUrl: './edit-form.component.css',
})
export class EditFormComponent implements OnInit {
  hero: SuperHero = {
    id: 1,
    name: '',
  };

  name = new FormControl('');

  constructor(
    @Optional() public dialogRef: MatDialogRef<EditFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: number },
    private superheroService: SuperheroesService
  ) {}
  closeDialog(): void {
    this.dialogRef.close();
  }
  ngOnInit(): void {
    this.superheroService.getHeroById(this.data.id).subscribe((hero) => {
      this.name.setValue(hero.name);
      this.hero.name = hero.name;
    });
    this.name.valueChanges.subscribe((newName) => console.log(newName));
  }
  saveName() {
    if (this.name.value !== null && this.name.value !== this.hero.name)
      this.superheroService
        .updateHero(this.data.id, {
          name: this.name.value,
        })
        .subscribe((result) => {
          if (result === true) this.closeDialog();
        });
  }
}
