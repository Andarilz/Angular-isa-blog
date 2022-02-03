import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import {environment} from '../../environments/environment';
import {FbCreateResponse, Post} from './interfaces';

@Injectable({providedIn: 'root'})

export class PostService {

    constructor(private http: HttpClient) {}

    create(post: Post): Observable<Post> {
        return this.http.post(`${environment.firebaseBdURL}/posts.json`, post)
            .pipe(map((response: FbCreateResponse) => {
                return {
                    ...post,
                    id: response.name,
                    date: new Date(post.date)
                };
            }));
    }

    getAll() {
        return this.http.get(`${environment.firebaseBdURL}/posts.json`)
            .pipe(map((res: {[key: string]: any}) => {
               return Object
                   .keys(res)
                   .map(key => ({
                       ...res[key],
                       id: key,
                       date: new Date(res[key].date)
                   }));
            }));
    }

    remove(id: string): Observable<void> {
        return this.http.delete<void>(`${environment.firebaseBdURL}/posts/${id}.json`);
    }

    getById(id: string): Observable<Post> {
        return this.http.get(`${environment.firebaseBdURL}/posts/${id}.json`)
            .pipe(map((post: Post) => {
                return {
                    ...post,
                    id,
                    date: new Date(post.date)
                };
            }));
    }

    update(post: Post): Observable<Post> {
        return this.http.patch<Post>(`${environment.firebaseBdURL}/posts/${post.id}.json`, post);
    }
}
