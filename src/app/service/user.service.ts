import { Injectable } from '@angular/core'; 
import { HttpClient } from '@angular/common/http';
import { configData } from 'config';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {  }
  loginSubmit (data: User) {
    const baseUrl = configData.userurl + 'validateuser'
    return this.http.post(baseUrl, data)
  }
}
