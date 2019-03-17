import { Component, OnInit } from '@angular/core';
import { GameService } from '../services/game/game.service';
import { TokenStorageService } from '../auth/token-storage.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css']
})
export class GamesComponent implements OnInit {
  info: any;
  games;
  gamesArray: string [];

  constructor(private gameService: GameService, private token: TokenStorageService) { }

  ngOnInit() {
    this.info = {
      token: this.token.getToken(),
    };

    this.gameService.getGames().subscribe(
      data => {
        this.gamesArray = data as string [];	 // FILL THE ARRAY WITH DATA.
        console.log(data);
      },
      (err: HttpErrorResponse) => {
        console.log (err.message);
      }
    );
  }

}
