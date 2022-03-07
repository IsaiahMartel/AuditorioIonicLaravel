import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthResponse } from 'src/app/models/auth-response';
import { User } from 'src/app/models/user/user';
import { Storage } from '@ionic/storage';
import { LocalStorageService } from '../local-storage/local-storage.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  username:string;

  AUTH_SERVER_ADDRESS: string = 'http://localhost:8000';

  constructor(private httpClient: HttpClient, private storage: Storage, private localStorageService: LocalStorageService) {

  }

  private getOptions(user: User) {
  
    this.username=user.email;
    let base64UserAndPassword = window.btoa(user.email + ":" + user.password);

    let basicAccess = 'Basic ' + base64UserAndPassword;

    let options = {
      headers: {
        'Authorization': basicAccess,
        'Content-Type': 'application/x-www-form-urlencoded',
      }
      //, withCredentials: true
    };

    return options;
  }


  register(user: User): Observable<any> {
    //return this.httpClient.post<any>(`${this.AUTH_SERVER_ADDRESS}/api/register/`, JSON.stringify(user))
    
    return this.httpClient.post<any>(`${this.AUTH_SERVER_ADDRESS}/api/register/`, user)
  }
  //.pipe(
  //   tap(async (res:  AuthResponse ) => {

  //     if (res.user) {
  //       await this.storage.set("token", res.access_token);
  //     }
  //   })

  //  );


  login(user: User): Observable<AuthResponse> {
    return this.httpClient.post(`${this.AUTH_SERVER_ADDRESS}/api/login`, user).pipe(
      tap(async (res: AuthResponse) => {

        if (res.access_token) {
          this.localStorageService.setToken(res.access_token);
          this.storage.ready().then(() => {
            this.storage.set("access_token", res.access_token);
          })
        }
      }));
  }

  async logout() {
    await this.storage.remove("access_token");
  }

  async isLoggedIn() {
    // return this.authSubject.asObservable();
    let token = await this.storage.get("access_token");
    if (token) { //Just check if exists. This should be checked with current date
      return true;
    }
    return false;
  }
}
