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

  constructor(private token: TokenStorageService) { }

  ngOnInit() {
    this.info = {
      token: this.token.getToken(),
    };
  }

}
