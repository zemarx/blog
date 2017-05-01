import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';


@Component({
    selector: 'root',
    template: `
    <div class="main-content">
        <header>
            <nav>
                <ul class="nav">
                    <!-- <li>{{title}}</li> -->
                    <li><a md-button routerLink="/postlist">All posts</a></li>
                    <li><a md-button routerLink="/addpost" *ngIf="isAuthenticated">Add new post</a></li>
                </ul>
            </nav>
            <div class="login">
                <button md-button id="login-btn" (click)="authService.login()" *ngIf="!isAuthenticated">Login</button>
                <button md-button id="logout-btn" (click)="authService.logout()" *ngIf="isAuthenticated">Logout</button>
            </div>
        </header>
        <router-outlet></router-outlet>
    </div>
    `,
    styleUrls: [
        'app.component.css'
    ],
    providers: [
        AuthService
    ]
})
export class AppComponent implements OnInit {
    private title = 'Blog!';
    private isAuthenticated: boolean = false;

    constructor(private authService: AuthService) {}

    ngOnInit(): void {
        this.isAuthenticated = this.authService.isAuthenticated();
    }

    // Gets jwt token's claim(info about user)
    getUserProfile() {
        let userProfile = JSON.parse(localStorage.getItem('profile'));
    }
}
