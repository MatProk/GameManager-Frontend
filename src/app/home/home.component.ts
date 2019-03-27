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

  constructor() { }
 
  ngOnInit() {
  }

}