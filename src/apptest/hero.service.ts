import {Injectable} from '@angular/core';
import {Http} from '@angular/http'
import 'rxjs/add/operator/toPromise';
import {HEROES} from './mocks.heros';
import {Hero} from './hero';
@Injectable()
export class HeroService {
  private heroesUrl='app/heroes';
  private headers=new Headers({'Content-Type':"application/json"});
  constructor(private http:Http){};
  getHeroes():Promise<Hero[]>{
  return this.http.get(this.heroesUrl)
    .toPromise()
    .then(response=>response.json().data as Hero[])
    .catch(this.handleError)
}
  getHero(id:number):Promise<Hero>{
    return this.getHeroes()
    .then(heroes=>heroes.find(hero=>hero.id===id))
  }
  update(hero:Hero):Promise<Hero>{
    const url=`${this.heroesUrl}/${hero.id}`;
    return this.http
    .put(url,JSON.stringify(hero),{headers:this.headers})
    .toPromise()
    .then(()=>hero)
    .catch(this.handleError);
  }
  create(name:string):Promise<Hero>{
    return this.http
        .post(this.heroesUrl,JSON.stringify({name:name}),{headers:this.headers})
        .toPromise()
        .then(res=>res.json().data)
        .catch(this.handleError);
  }
}
