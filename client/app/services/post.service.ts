import {Injectable} from '@angular/core';
import {PlatformLocation} from '@angular/common';
import {Http, RequestOptions, Headers} from '@angular/http';

import {Post} from '../components/models/post';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class PostService {

    // BASE_API_URL: string = 'http://localhost:3000/api';
    // this.platformLocation.location.origin + '/api'

    // BASE_API_URL: string = window.location.origin + '/api';
    BASE_API_URL: string = 'http://localhost:3000/api';

    constructor(private http: Http,
                private platformLocation: PlatformLocation) { };

    public deletePost(id: string): Observable<any> {
        return this.http.delete(this.BASE_API_URL + '/posts/' + id)
            .map(res => res.json)
            .catch(err => {
                console.log(err);
                return Observable.throw(err.json());
            });
    }

    public updatePost(id: string, post: Post): Observable<any> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.put(this.BASE_API_URL + '/posts/' + id, {
            post: post
        }, options)
            .map(res => res.json())
            .catch(err => {
                console.log(err);
                return Observable.throw(err.json());
            });
    };

    public addNewPost(post: Post): Observable<any> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.BASE_API_URL + '/posts', {
            post: post
        }, options)
            .map(res => res.json())
            .catch(err => {
                console.log(err);
                return Observable.throw(err.json());
            });
    };

    public getAllPosts(): Observable<any> {
        return this.http.get(this.BASE_API_URL + '/posts')
            .map(res => res.json())
            .catch(err => {
                console.log(err);
                return Observable.throw(err.json());
            });
    };

    public getPost(id: string): Observable<any> {
        return this.http.get(this.BASE_API_URL + '/posts/' + id)
            .map(res => res.json())
            .catch(err => {
                return Observable.throw(err.json());
            });
    }
}
