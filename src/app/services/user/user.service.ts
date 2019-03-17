import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenStorageService } from '../../auth/token-storage.service';
 
@Injectable({
  providedIn: 'root'
})
export class UserService {
 
  private user = 'http://localhost:8081/api/test/user';
  private pm = 'http://localhost:8081/api/test/pm';
  private admin = 'http://localhost:8081/api/test/admin';
  private userProf = 'http://localhost:8080/profile';
 
  constructor(private http: HttpClient, private tokenService: TokenStorageService) { }

  getUser(): Observable<any> {
    return this.http.get(this.userProf, { headers: {'Authorization': 'Bearer ' + this.tokenService.getToken()}});
  }
 
  getUserBoard(): Observable<string> {
    return this.http.get(this.user, { responseType: 'text' });
  }
 
  getPMBoard(): Observable<string> {
    return this.http.get(this.pm, { responseType: 'text' });
  }
 
  getAdminBoard(): Observable<string> {
    return this.http.get(this.admin, { responseType: 'text' });
  }


}