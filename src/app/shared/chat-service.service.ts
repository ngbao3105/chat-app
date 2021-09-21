import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ChatServiceService {

  constructor(@Inject(HttpClient) private http: HttpClient) { }
  private graphqlUrl = "http://localhost:3000/graphql";
  postBody(body): Observable<any> {
    const headers = { 'Content-Type': 'application/json' };
    return this.http.post<any>(this.graphqlUrl, body, { headers }).pipe(
      catchError((error) => {
        if (error.status === 500)
          return of([]);
      })
    );
  }
}
