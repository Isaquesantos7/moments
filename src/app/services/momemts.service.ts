import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Moment } from '../Moment';
import { Response } from '../Response';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class MomemtsService {
  private baseApiUrl = environment.baseApiUrl;
  private apiUrl = `${this.baseApiUrl}api/moments`;

  constructor(private http: HttpClient) {}

  getMoment(id: number): Observable<Response<Moment>> {
    
    const url: string = `${this.apiUrl}/${id}`;
    return this.http.get<Response<Moment>>(url);
  }

  getMoments(): Observable<Response<Moment[]>> {

    return this.http.get<Response<Moment[]>>(this.apiUrl)
  }

  createMoment(formData: FormData): Observable<FormData> {
    
    return this.http.post<FormData>(this.apiUrl, formData);
  }
}
