import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../model/user';

@Injectable({ providedIn: 'root' })
export class UserService {
    private baseUrl = '/api/v1/users';

    constructor(private http: HttpClient) {}

    getAll(): Observable<User[]> {
        return this.http.get<User[]>(this.baseUrl);
    }

    getById(id: string): Observable<User> {
        return this.http.get<User>(`${this.baseUrl}/${id}`);
    }

    create(user: User): Observable<User> {
        return this.http.post<User>(this.baseUrl, user);
    }

    update(id: string, user: User): Observable<User> {
        return this.http.put<User>(`${this.baseUrl}/${id}`, user);
    }

    delete(id: string): Observable<void> {
        return this.http.delete<void>(`${this.baseUrl}/${id}`);
    }
}
