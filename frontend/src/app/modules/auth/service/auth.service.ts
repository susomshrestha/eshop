import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  login(): any {
    return this.http
      .post(this.baseUrl + 'user/login', {
        email: 'susom@test.com',
        password: 'susom123',
      })
      .pipe(tap((res: any) => this.setSession(res)));
  }

  logout(): any {
    this.removeSession();
  }

  private setSession(authResult: any) {
    localStorage.setItem('token', authResult.token);

    // const expiresAt = moment().add(authResult.expiresIn,'second');
    // localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()) );
  }

  private removeSession() {
    localStorage.removeItem('token');
  }

  getUser(): any {
    return this.http.get(this.baseUrl + 'products');
  }
}
