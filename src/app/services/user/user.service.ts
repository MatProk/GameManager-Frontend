import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenStorageService } from '../../auth/token-storage.service';
 
@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userInfo = 'http://localhost:8080/profile';
 
  constructor(private http: HttpClient, private tokenService: TokenStorageService) { }

  getUser(): Observable<any> {
    return this.http.get(this.userInfo, { headers: {'Authorization': 'Bearer ' + this.tokenService.getToken()}});
  }


}