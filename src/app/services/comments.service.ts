import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environment/environment';
import { Comment } from '../Comment';
import { Response } from '../Response';
@Injectable({
  providedIn: 'root'
})
export class CommentsService {
  private baseApiUrl: string = environment.baseApiUrl;
  private apiUrl: string = `${this.baseApiUrl}api/moments`;
  
  constructor(
    private http: HttpClient,
  ) { }

  createComment(data: Comment): Observable<Response<Comment>> {
    const url = `${this.apiUrl}/${data.momentId}/comments`;
    return this.http.post<Response<Comment>>(url, data);
  }
}
