import { Component, OnInit, ViewChild } from '@angular/core';
import { GameExample } from '../services/game/game.resource';
import { TokenStorageService } from '../auth/token-storage.service';
import { GameService } from '../services/game/game.service';
import { saveAs } from 'file-saver';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { MatTableDataSource, MatPaginator } from '@angular/material';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {

  private listGames = 'http://localhost:8080';

  info: any;
  game = new GameExample();
  arrGames: string [];
  data;

  displayedColumns: string[] = ['id', 'name', 'author', 'show'];
  dataSource = new MatTableDataSource();
  searchResult;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(private http: HttpClient, private token: TokenStorageService, private gameService: GameService) { }
 
  ngOnInit() {
    this.gameService.getGames().subscribe(data =>{
      this.arrGames = data as string [];
      this.data = data;
      console.log(this.data[0].name);
    })
    this.info = {
      token: this.token.getToken(),
    };

    this.gameService.getGames().subscribe (res => {
      this.searchResult = res;
      this.dataSource.data = this.searchResult;
      this.dataSource = new MatTableDataSource(this.searchResult);
      this.dataSource.paginator = this.paginator;

    });
  }

  addGame(){
    console.log(this.game);
    this.gameService.addGame(this.game).subscribe(res => {
      this.game.name = "";
      this.game.author = "";
      this.game.description = "";
      this.game.gameMode = "";
      this.game.releaseDate = null;
      this.gameService.getGames().subscribe (res => {
        this.searchResult = res;
        this.dataSource.data = this.searchResult;
        this.dataSource = new MatTableDataSource(this.searchResult);
        this.dataSource.paginator = this.paginator;
  
      });
    })
    
  }

  download() {
    let headers = new HttpHeaders();
    headers = headers.set('Accept', 'application/pdf');
    return this.http.get(this.listGames + "/raport/games", { headers: headers, responseType: 'blob' }).subscribe(
      data => {
        saveAs(data, 'book-raport.pdf')
      }
    );
  }

  deleteGame(id: number){
    this.gameService.deleteGame(id).subscribe(data => {
      this.gameService.getGames().subscribe (res => {
        this.searchResult = res;
        this.dataSource.data = this.searchResult;
        this.dataSource = new MatTableDataSource(this.searchResult);
        this.dataSource.paginator = this.paginator;
  
      });
    },(error) => {
      console.log(error);
    }
    )
  }
}
