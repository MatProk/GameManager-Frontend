import { Component, OnInit, ViewChild } from '@angular/core';
import { GameService } from '../services/game/game.service';
import { TokenStorageService } from '../auth/token-storage.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { DataSource } from '@angular/cdk/table';
import { GameExample } from '../services/game/game.resource';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css']
})
export class GamesComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'author', 'releaseDate', 'show'];
  dataSource = new MatTableDataSource();
  searchResult;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private gameService: GameService){}

  ngOnInit() {
    this.gameService.getGames().subscribe (res => {
      this.searchResult = res;
      this.dataSource.data = this.searchResult;
      this.dataSource = new MatTableDataSource(this.searchResult);
      this.dataSource.paginator = this.paginator;
    });
  }
}

