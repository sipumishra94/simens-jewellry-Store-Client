import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginDetails } from '../_model/login-details.model';
import {map} from 'rxjs/operators';
import { UserDetails } from '../_model/user-details.model';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl : string = 'https://localhost:44358/api/v1.0/';

  constructor(private http: HttpClient) { }

  logIn(model:LoginDetails){
    return this.http.post(this.baseUrl + 'User/login', model).pipe(
      map((response: any) => {
        const user = response;
        if (user) {
            this.setCurrentUser(user);
        }
      })
    )
  }

  logout() {
    localStorage.removeItem('user');
  }

  setCurrentUser(user: UserDetails) {
    localStorage.setItem('user', JSON.stringify(user));
  }

}
