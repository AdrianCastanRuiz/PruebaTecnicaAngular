import { Injectable } from '@angular/core';
import { Observable, debounceTime, delay, of } from 'rxjs';

export interface SuperHero {
  id: number;
  name: string;
}

export interface Pageable<T> {
  data: T[];
  pageSize: number;
  pageNumber: number;
  totalElements: number;
  totalPages: number;
  lastPage: boolean;
}

export interface Filter {
  query?: string;
  pageSize: number;
  pageNumber: number;
}

@Injectable({
  providedIn: 'root',
})
export class SuperheroesService {
  private heroes: SuperHero[];

  constructor() {
    this.heroes = [
      { id: 1, name: 'manolooooo' },
      { id: 2, name: 'Superman' },
      { id: 3, name: 'Batman' },
      { id: 4, name: 'Manolito el fuerte' },
      { id: 5, name: 'Spiderman' },
      { id: 6, name: 'pepe' },
      { id: 7, name: 'juan' },
      { id: 8, name: 'sasas' },
      { id: 9, name: 'hola' },
      { id: 10, name: 'Sman' },
      { id: 11, name: 'oli' },
      { id: 12, name: 'Miguael' },
    ];
  }

  getAllHeroes(filter: Filter): Observable<Pageable<SuperHero>> {
    const { pageSize, pageNumber } = filter;
    let heroes = [];
    if (filter.query) {
      console.log(filter);

      const query: string = filter.query;
      heroes = this.heroes.filter((hero) =>
        hero.name.toLowerCase().includes(query.toLowerCase())
      );
      console.log(heroes);
    } else {
      heroes = this.heroes;
    }

    const totalElements = heroes.length;
    const totalPages = Math.ceil(totalElements / pageSize);
    const data = [];
    for (
      let i = pageNumber * pageSize;
      i < pageNumber * pageSize + pageSize;
      i++
    ) {
      if (heroes[i]) data.push(heroes[i]);
    }

    const response: Pageable<SuperHero> = {
      data,
      pageSize,
      pageNumber,
      totalElements,
      totalPages,
      lastPage: pageNumber + 1 == totalPages,
    };

    return of(response).pipe(delay(800));
  }

  getHeroById(id: number): Observable<any> {
    return of(this.heroes.find((hero) => hero.id === id)).pipe(delay(800));
  }

  updateHero(heroId: number, heroData: { name: string }): Observable<boolean> {
    const index = this.heroes.findIndex((hero) => hero.id === heroId);
    if (index !== -1) {
      this.heroes[index].name = heroData.name;
      return of(true).pipe(delay(800));
    }
    return of(false);
  }
  addHero(hero: { name: string }): Observable<boolean> {
    const newId =
      this.heroes.length > 0
        ? Math.max(...this.heroes.map((h) => h.id)) + 1
        : 1;
    this.heroes.push({ id: newId, ...hero });
    return of(true).pipe(delay(800));
  }

  deleteHero(heroId: number): Observable<boolean> {
    const index = this.heroes.findIndex((hero) => hero.id === heroId);
    if (index !== -1) {
      this.heroes.splice(index, 1);
      return of(true).pipe(delay(700));
    }
    return of(false).pipe(delay(700));
  }
}
