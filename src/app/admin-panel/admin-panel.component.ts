import { Component, OnInit, ViewChild } from '@angular/core';
import { GameExample } from '../services/game/game.resource';
import { TokenStorageService } from '../auth/token-storage.service';
import { GameService } from '../services/game/game.service';
import { saveAs } from 'file-saver';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { UserService } from '../services/user/user.service';
import { isInteger } from '@ng-bootstrap/ng-bootstrap/util/util';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {

  private listGames = 'http://localhost:8080';
  userInfo
  info: any;
  game = new GameExample();
  arrGames: string [];
  data;
  isEditing = false;

  registerForm: FormGroup;
  submitted = false;

  displayedColumns: string[] = ['id', 'name', 'author', 'show'];
  dataSource = new MatTableDataSource();
  searchResult;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(private formBuilder: FormBuilder, private toastr: ToastrService, private http: HttpClient, private token: TokenStorageService, private gameService: GameService, private profile: UserService) { }
 
  ngOnInit() {
    this.profile.getUser().subscribe(data =>{
      this.userInfo = data;
    })
    this.gameService.getGames().subscribe(data =>{
      this.arrGames = data as string [];
      this.data = data;
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

    this.registerForm = this.formBuilder.group({
      nameControl: ['', Validators.required],
      authorControl: ['', Validators.required],
      descriptionControl: ['', [Validators.required]],
      gameModeControl: ['', [Validators.required]],
      releaseDateControl: ['', Validators.required],
  });
 }

 get f() { return this.registerForm.controls; }

  addGame(){
    this.submitted = true;
    if(this.registerForm.invalid){
      return;
    }
    console.log(this.game);
    this.gameService.addGame(this.game).subscribe(res => {
      this.game.name = "";
      this.game.author = "";
      this.game.description = "";
      this.game.gameMode = "";
      this.game.releaseDate = null;
      this.toastr.success('Pomyslnie dodano gre', 'Sukces!');
      this.gameService.getGames().subscribe (res => {
        this.searchResult = res;
        this.dataSource.data = this.searchResult;
        this.dataSource = new MatTableDataSource(this.searchResult);
        this.dataSource.paginator = this.paginator;
  
      });
    })
    this.submitted = false;
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
      this.toastr.error('Pomyslnie usunieto gre');
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

  private imageSrc: string = '';

  handleInputChange(e) {
    var file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
    var pattern = /image-*/;
    var reader = new FileReader();
    if (!file.type.match(pattern)) {
      alert('Bledny format');
      return;
    }
    reader.onload = this._handleReaderLoaded.bind(this);
    reader.readAsDataURL(file);
  }

  _handleReaderLoaded(e) {
    let reader = e.target;
    this.game.payload = reader.result;
  }

  updateGame(){
      let zmienna = this.game.id;
      console.log(this.game.id)
      this.gameService.updateGame(zmienna, this.game).subscribe(data => {
        this.isEditing = false;
        this.game.name = "";
        this.game.author = "";
        this.game.description = "";
        this.game.gameMode = "";
        this.game.releaseDate = null;
        this.toastr.info('Pomyslnie zaktualizowano gre', 'Sukces!');
        console.log("pykło");
      })
  }

  startEdit(gameId: number){
    this.gameService.getOneGame(gameId).subscribe(data => {
      console.log(data);
      this.game = data
    })
    this.isEditing = true;
  }
}
