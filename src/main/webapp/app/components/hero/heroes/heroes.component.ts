import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router-deprecated';

import { Hero } from './../hero';
import { HeroDetailComponent } from './../heroDetail/hero-detail.component';
import { HeroService } from './../hero.service';


@Component({
    selector: 'my-heroes',
    templateUrl: 'app/components/hero/heroes/heroes.component.html',
    styleUrls: ['app/components/hero/heroes/heroes.component.css']
})

export class HeroesComponent implements OnInit {
    heroes:Hero[];
    selectedHero:Hero;

    constructor(
        private router: Router,
        private heroService: HeroService) { }

    getHeroes() {
        this.heroService.getHeroes().then(heroes => this.heroes = heroes);
    }

    ngOnInit() {
        this.getHeroes();
    }

    onSelect(hero:Hero) {
        this.selectedHero = hero;
    };

    gotoDetail() {
        this.router.navigate(['HeroDetail', { id: this.selectedHero.id }]);
    }
}
