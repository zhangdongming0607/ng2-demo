import { Component ,OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {HeroService} from './hero.service';
import {Hero} from './hero';
@Component({
  selector: 'my-heroes',
  templateUrl:'heroes.component.html'
  ,
  styleUrls: ['heroes.component.css']
})
export class HeroesComponent implements OnInit{
  constructor(
    private router:Router,
    private heroService: HeroService) { }
  title = 'Tour of Heroes';
  selectedHero: Hero;
  heroes:Hero[];
  getHeroes(): void {
    this.heroService.getHeroes().then(heroes=>this.heroes=heroes)
  }
  onSelect(hero:Hero):void{
    this.selectedHero=hero;
  }
  ngOnInit(): void {
    this.getHeroes();
  }
  gotoDetail():void{
    this.router.navigate(['/detail',this.selectedHero.id])
  }
  add(name:string):void{
    name=name.trim();
    if(!name){return;}
    this.heroService.create(name)
     .then(hero=>{
       this.heroes.push(hero);
       this.selectedHero=null;
     })
  }
}
