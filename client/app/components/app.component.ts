import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
    moduleId: module.id,
    selector: 'root',
    template: `
    <!--suppress ALL -->
    <div class="main-content">
        <header>
            <nav>
                <ul class="nav">
                    <li><a routerLink="/postlist">All posts</a></li>
                    <li><a routerLink="/addpost" *ngIf="authService.authenticated()">Add new post</a></li>
                </ul>
            </nav>
            <div class="login">
                <button id="login-btn" (click)="authService.login()" *ngIf="!authService.authenticated()">Login</button>
                <button id="logout-btn" (click)="authService.logout()" *ngIf="authService.authenticated()">Logout</button>
                <!--<button id="show-data" (click)="showData()">Show user data</button>-->
                <!--<h1 id="main-title">{{title}}</h1>-->
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
export class AppComponent {
    title = 'Welcome to the blog!';

    constructor(private authService: AuthService) {}

    showData() {
        let userProfile = JSON.parse(localStorage.getItem('profile'));
        // console.log(JSON.stringify(userProfile, null, 2));
        console.log(`User email: ${userProfile.email}\nUser nickname: ${userProfile.user_metadata.username}`);
    }

}
