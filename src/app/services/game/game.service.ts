import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GameExample } from './game.resource';
import { TokenStorageService } from 'src/app/auth/token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private listGames = 'http://localhost:8080/game';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };
 
  constructor(private http: HttpClient, private tokenService: TokenStorageService) { }

  addGame(game: GameExample): Observable<GameExample> {
    return this.http.post<GameExample>(this.listGames, game, this.httpOptions)
  }


  getGames(): Observable<any> {
    return this.http.get(this.listGames, { headers: {'Authorization': 'Bearer ' + this.tokenService.getToken()}});
  }
  
}
