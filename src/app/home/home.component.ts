import { Component, OnInit } from '@angular/core';
 
import { TokenStorageService } from '../auth/token-storage.service';
import { GameService } from '../services/game/game.service';
import { GameExample } from '../services/game/game.resource';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  info: any;
  game = new GameExample();

  constructor(private token: TokenStorageService, private gameService: GameService) { }
 
  ngOnInit() {
    this.info = {
      token: this.token.getToken(),
    };
  }

  addGame(){
    console.log(this.game);
    this.gameService.addGame(this.game).subscribe(res => {
    })
    this.game.name = "";
    this.game.author = "";
    this.game.description = "";
    this.game.gameMode = "";
    this.game.releaseDate = null;

  }

}