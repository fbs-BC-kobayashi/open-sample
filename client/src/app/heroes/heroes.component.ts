import { Component, OnInit } from '@angular/core';

import { Hero } from './hero';
import { HeroesService } from './heroes.service';

@Component({
  selector: 'app-heroes',
  templateUrl: '../heroes/heroes.component.html',
  providers: [HeroesService],
  styleUrls: ['../heroes/heroes.component.css']
})
export class HeroesComponent implements OnInit {
  heroes: Hero[];
  editHero: Hero; // the hero currently being edited

  constructor(private heroesService: HeroesService) {}

  ngOnInit() {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroesService.getHeroes()
      .subscribe(heroes => (this.heroes = heroes));
  }

  add(name: string): void {
    console.log("add!!")
    this.editHero = undefined;
    name = name.trim();
    if (!name) {
      return;
    }

    // The server will generate the id for this new hero
    const newHero: Hero = { name } as Hero;
    this.heroesService
      .addHero(newHero)
      .subscribe(hero => this.heroes.push(hero));
  }

  delete(hero: Hero): void {
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroesService
      .deleteHero(hero.id)
      .subscribe();
    /*
    // oops ... subscribe() is missing so nothing happens
    this.heroesService.deleteHero(hero.id);
    */
  }

  edit(hero: Hero) {
    this.editHero = hero;
  }

  search(searchTerm: string) {
    this.editHero = undefined;
    if (searchTerm) {
      this.heroesService
        .searchHeroes(searchTerm)
        .subscribe(heroes => (this.heroes = heroes));
    }
  }

}
