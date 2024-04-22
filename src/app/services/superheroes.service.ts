import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface SuperHero {
  id: number;
  name: string;
}

@Injectable({
  providedIn: 'root',
})
export class SuperheroesService {
  private heroes: SuperHero[];

  constructor() {
    this.heroes = [
      { id: 1, name: 'Spiderman' },
      { id: 2, name: 'Superman' },
      { id: 3, name: 'Batman' },
      { id: 4, name: 'Manolito el fuerte' },
    ];
  }

  getAllHeroes(): Observable<SuperHero[]> {
    return of(this.heroes);
  }

  getHeroById(id: number): Observable<any> {
    return of(this.heroes.find((hero) => hero.id === id));
  }

  searchHeroes(query: string): Observable<SuperHero[]> {
    return of(
      this.heroes.filter((hero) =>
        hero.name.toLowerCase().includes(query.toLowerCase())
      )
    );
  }

  updateHero(heroId: number, heroData: { name: string }): Observable<boolean> {
    const index = this.heroes.findIndex((hero) => hero.id === heroId);
    if (index !== -1) {
      this.heroes[index].name = heroData.name;
      return of(true);
    }
    return of(false);
  }
  addHero(hero: { name: string }): Observable<boolean> {
    const newId =
      this.heroes.length > 0
        ? Math.max(...this.heroes.map((h) => h.id)) + 1
        : 1;
    this.heroes.push({ id: newId, ...hero });
    return of(true);
  }

  deleteHero(heroId: number): Observable<boolean> {
    const index = this.heroes.findIndex((hero) => hero.id === heroId);
    if (index !== -1) {
      this.heroes.splice(index, 1);
      return of(true);
    }
    return of(false);
  }
}
