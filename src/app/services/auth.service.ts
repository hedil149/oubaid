import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _registerUrl = "http://localhost:3000/api/auth/register";
  private _loginUrl= "http://localhost:3000/api/auth/login";

  constructor(private http: HttpClient) { }
 registerUser(user: any) {
    return this.http.post<any>(this._registerUrl, user)

  }


loginUser(user: any){
  return this.http.post<any>(this._loginUrl, user)
}




}
