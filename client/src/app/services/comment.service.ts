import {Injectable} from '@angular/core';
import {Comment} from '../models/comment.model';
import {Observable} from 'rxjs/Observable';
import {RequestOptions, Headers, Http} from "@angular/http";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class CommentService {

    BASE_API_URL: string = 'http://localhost:3000/api';
    // this.platformLocation.location.origin + '/api'

    // BASE_API_URL: string = window.location.origin + '/api';

    constructor(private http: Http) { };

    public deleteComment(id: string): void {
    }

    public updateComment(id: string, comment: Comment): void {

    };

    public addNewComment(comment: Comment): Observable<any> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.BASE_API_URL + `/comments?`, {
            comment: comment
        }, options)
            .map(res => res.json())
            .catch(err => {
                console.log(err);
                return Observable.throw(err.json());
            });
    };

    public getPostComments(postId: string): Observable<any> {
        return this.http.get(this.BASE_API_URL + `/comments?postId=${postId}`)
            .map(res => res.json())
            .catch(err => {
                console.log(err);
                return Observable.throw(err.json());
            });
    }

    public getAllComments(postId: string): Array<Comment> {
        let comments: Array<Comment> = [
            {
                _id: '1',
                postId: '1',
                parentId: '',
                authorName: 'Mark Piispanen',
                content: 'The attacker has' +
                    'hijacked the connection and he or she is' +
                    'now able to intercept the data, alter data,' +
                    'add new data, or even prevent the data' +
                    'transfer to communicating parties',
                dateAdded: new Date(),
                children: [
                    {
                        _id: '2',
                        postId: '1',
                        parentId: '1',
                        authorName: 'Peter Parker',
                        content: 'The attacker has' +
                            'hijacked the connection and he or she is' +
                            'now able to intercept the data, alter data,' +
                            'add new data, or even prevent the data' +
                            'transfer to communicating parties',
                        dateAdded: new Date(),
                        children: null
                    },
                    {
                        _id: '3',
                        postId: '1',
                        parentId: '1',
                        authorName: 'Bruce Banner',
                        content: 'The attacker has' +
                            'hijacked the connection and he or she is' +
                            'now able to intercept the data, alter data,' +
                            'add new data, or even prevent the data' +
                            'transfer to communicating parties',
                        dateAdded: new Date(),
                        children: null
                    },
                ]
            },
            {
                _id: '4',
                postId: '1',
                parentId: null,
                authorName: 'James Bond',
                content: 'The attacker has' +
                    'hijacked the connection and he or she is' +
                    'now able to intercept the data, alter data,' +
                    'add new data, or even prevent the data' +
                    'transfer to communicating parties',
                dateAdded: new Date(),
                children: null
            },
            {
                _id: '5',
                postId: '1',
                parentId: null,
                authorName: 'Bruce Wayne',
                content: 'The attacker has' +
                    'hijacked the connection and he or she is' +
                    'now able to intercept the data, alter data,' +
                    'add new data, or even prevent the data' +
                    'transfer to communicating parties',
                dateAdded: new Date(),
                children: [
                    {
                        _id: '6',
                        postId: '1',
                        parentId: '5',
                        authorName: 'Barry Allen',
                        content: 'The attacker has' +
                            'hijacked the connection and he or she is' +
                            'now able to intercept the data, alter data,' +
                            'add new data, or even prevent the data' +
                            'transfer to communicating parties',
                        dateAdded: new Date(),
                        children: null
                    },
                    {
                        _id: '7',
                        postId: '1',
                        parentId: '5',
                        authorName: 'James Dean',
                        content: 'The attacker has' +
                            'hijacked the connection and he or she is' +
                            'now able to intercept the data, alter data,' +
                            'add new data, or even prevent the data' +
                            'transfer to communicating parties',
                        dateAdded: new Date(),
                        children: null
                    },
                    {
                        _id: '8',
                        postId: '1',
                        parentId: '5',
                        authorName: 'David Bowie',
                        content: 'The attacker has' +
                            'hijacked the connection and he or she is' +
                            'now able to intercept the data, alter data,' +
                            'add new data, or even prevent the data' +
                            'transfer to communicating parties',
                        dateAdded: new Date(),
                        children: null
                    },
                ]
            },
        ];

        return comments;
    };
}
