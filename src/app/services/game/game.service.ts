import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { Observable } from 'rxjs';
import { GameExample } from './game.resource';

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

  getGames(): Observable<any> {
    return this.http.get(this.listGames, { headers: {'Authorization': 'Bearer ' + this.tokenService.getToken()}});
  }

  addGame(game: GameExample): Observable<GameExample> {
    return this.http.post<GameExample>(this.listGames, game, this.httpOptions)
  }
}
