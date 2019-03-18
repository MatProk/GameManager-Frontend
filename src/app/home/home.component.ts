import { Component, OnInit } from '@angular/core';
 
import { TokenStorageService } from '../auth/token-storage.service';
import {NgbDateStruct, NgbCalendar} from '@ng-bootstrap/ng-bootstrap';
import { GameService } from '../services/game/game.service';
import { GameExample } from '../services/game/game.resource';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  info: any;
  model: NgbDateStruct;
  date: {year: number, month: number};
  
  game = new GameExample();

  constructor(private token: TokenStorageService, private calendar: NgbCalendar, private gameService: GameService) { }
 
  ngOnInit() {
    this.info = {
      token: this.token.getToken(),
    };
  }

  addGame(){
    console.log(this.game);
    this.gameService.addGame(this.game).subscribe(res => {
      //console.error(res);
    })
    this.game.name = "";
    this.game.author = "";
    this.game.description = "";
    this.game.gameMode = "";

  }

}