import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../auth/token-storage.service';
import { Router, ActivatedRoute } from '@angular/router';
import { GameService } from '../services/game/game.service';

@Component({
  selector: 'app-game-details',
  templateUrl: './game-details.component.html',
  styleUrls: ['./game-details.component.css']
})
export class GameDetailsComponent implements OnInit {

  game: any;
  hasToken: any;
  errorinfo: string = null;

  constructor(private gameService: GameService,
              private route: ActivatedRoute,
              private router: Router,
              private token: TokenStorageService) {

    this.route.params.subscribe(params => {
      this.gameService.getOneGame(params['id']).subscribe(data => {
        console.log(data);
        this.game = data})
    });
  }

  ngOnInit() {

  }
}
