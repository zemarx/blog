import {Injectable} from '@angular/core';
import {Comment} from '../components/models/comment';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import {RequestOptions, Headers, Http} from "@angular/http";

@Injectable()
export class CommentService {

    // BASE_API_URL: string = 'http://localhost:3000/api';
    // this.platformLocation.location.origin + '/api'

    BASE_API_URL: string = window.location.origin + '/api';

    constructor(private http: Http) { };

    public deleteComment(id: string): void {
    }

    public updateComment(id: string, comment: Comment): void {

    };

    public addNewComment(postId: string, comment: Comment): Observable<any> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.BASE_API_URL + `/comments?postId=${postId}`, {
            comment: comment
        }, options)
            .map(res => res.json())
            .catch(err => {
                console.log(err);
                return Observable.throw(err.json());
            });
    };

    public getAllComments() : Object[] {
        let comments: Object[] = [
            {
                _id: '1',
                author: 'Mark Piispanen',
                content: 'The attacker has' +
                    'hijacked the connection and he or she is' +
                    'now able to intercept the data, alter data,' +
                    'add new data, or even prevent the data' +
                    'transfer to communicating parties',
                date: new Date(),
                children: [
                    {
                        _id: '2',
                        author: 'Peter Parker',
                        content: 'The attacker has' +
                            'hijacked the connection and he or she is' +
                            'now able to intercept the data, alter data,' +
                            'add new data, or even prevent the data' +
                            'transfer to communicating parties',
                        date: new Date(),
                        children: null
                    },
                    {
                        _id: '3',
                        author: 'Bruce Banner',
                        content: 'The attacker has' +
                            'hijacked the connection and he or she is' +
                            'now able to intercept the data, alter data,' +
                            'add new data, or even prevent the data' +
                            'transfer to communicating parties',
                        date: new Date(),
                        children: null
                    },
                ]
            },
            {
                _id: '4',
                author: 'James Bond',
                content: 'The attacker has' +
                    'hijacked the connection and he or she is' +
                    'now able to intercept the data, alter data,' +
                    'add new data, or even prevent the data' +
                    'transfer to communicating parties',
                date: new Date(),
                children: null
            },
            {
                _id: '5',
                author: 'Bruce Wayne',
                content: 'The attacker has' +
                    'hijacked the connection and he or she is' +
                    'now able to intercept the data, alter data,' +
                    'add new data, or even prevent the data' +
                    'transfer to communicating parties',
                date: new Date(),
                children: [
                    {
                        _id: '6',
                        author: 'Barry Allen',
                        content: 'The attacker has' +
                            'hijacked the connection and he or she is' +
                            'now able to intercept the data, alter data,' +
                            'add new data, or even prevent the data' +
                            'transfer to communicating parties',
                        date: new Date(),
                        children: null
                    },
                    {
                        _id: '7',
                        author: 'James Dean',
                        content: 'The attacker has' +
                            'hijacked the connection and he or she is' +
                            'now able to intercept the data, alter data,' +
                            'add new data, or even prevent the data' +
                            'transfer to communicating parties',
                        date: new Date(),
                        children: null
                    },
                    {
                        _id: '8',
                        author: 'David Bowie',
                        content: 'The attacker has' +
                            'hijacked the connection and he or she is' +
                            'now able to intercept the data, alter data,' +
                            'add new data, or even prevent the data' +
                            'transfer to communicating parties',
                        date: new Date(),
                        children: null
                    },
                ]
            },
        ];

        return comments;
    };
}
